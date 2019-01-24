import React, { Component } from "react";
import { connect } from "react-redux";
import MyScheduler from "./MyScheduler";
import HomeSelects from "./HomeSelects";
import EventInfos from "./EventInfos";
import { closeEventInfos } from "../../actions/homeActions";

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
                <div className='eventInfos' onClick={this.props.closeEventInfos}>
                    {this.props.eventInfos.prof ? <EventInfos prof={eventInfos.prof.toString()} themes={eventInfos.themes} typeEns={eventInfos.typeEns} /> : null}
                </div>
            </div>
        )
    }
};

export default connect(mapStateToProps, {closeEventInfos})(Home);