import React, { Component } from "react";
import { connect } from "react-redux";
import MyScheduler from "./MyScheduler";
import HomeSelects from "./HomeSelects";
import EventPanel from "./EventPanel/EventPanel";
import WelcomeAnimation from "./WelcomeAnimation";

const mapStateToProps = state => {
    return { eventInfos: state.eventInfos, schedulerData: state.schedulerData }
};

class Home extends Component{       // BUG GRAPHIQUE SUR L'EDIT DE CRENEAU ! POURQUOI ?

    render(){
        let eventInfos = this.props.eventInfos;
        return (
            <div>
                <MyScheduler />
                <HomeSelects />
                <div style={{marginTop: '-4%'}}>
                    {this.props.schedulerData.resources[0] ? null : <WelcomeAnimation />}
                </div>
                <div style={{marginTop: '-4%'}}>
                    {this.props.eventInfos.prof ? <EventPanel event={eventInfos.event} prof={eventInfos.prof.toString()} themes={eventInfos.themes} typeEns={eventInfos.typeEns} /> : null}
                </div>
            </div>
        )
    }
};

export default connect(mapStateToProps)(Home);