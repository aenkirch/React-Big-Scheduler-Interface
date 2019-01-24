import React, { Component } from "react";
import { connect } from "react-redux";
import MyScheduler from "./MyScheduler";
import HomeSelects from "./HomeSelects";
import EventPanel from "./EventPanel";

const mapStateToProps = state => {
    return { eventInfos: state.eventInfos }
};

class Home extends Component{

    render(){
        let eventInfos = this.props.eventInfos;
        return (
            <div>
                <MyScheduler />
                <HomeSelects />
                {this.props.eventInfos.prof ? <EventPanel event={eventInfos.event} prof={eventInfos.prof.toString()} themes={eventInfos.themes} typeEns={eventInfos.typeEns} /> : null}
            </div>
        )
    }
};

export default connect(mapStateToProps)(Home);