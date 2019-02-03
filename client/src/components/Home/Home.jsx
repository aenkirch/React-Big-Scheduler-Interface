import React, { Component } from "react";
import { connect } from "react-redux";
import MyScheduler from "./MyScheduler";
import SecondView from "./SecondView/SecondView";
import HomeSelects from "./HomeSelects";
import EventPanel from "./EventPanel/EventPanel";
import WelcomeAnimation from "./WelcomeAnimation";

/*  
    *
    * This class handles which scheduler View is displayed depending on :
    * - if the user has already selected his class
    * - if the user has selected another view
    * 
    * To know if the user has done a certain action, the Home component is connected to the state of our app (using mapStateToProps function) : this way,
    * it will be constantly listening to the values of the state elements indicating if a user has done a certain action.
    * 
    * Here are some examples of what the Home Component will be doing depending of the state values it listens to :
    * 
    * - when user has selected his class, the Welcome animation will be replaced by null
    * 
    * - if eventInfos object is filled, the component will display a eventInfos panel
    * 
    * 
*/

class Home extends Component{

    render(){
        let eventInfos = this.props.eventInfos;
        return (
            <div>
                {this.props.isFirstViewActive ? <MyScheduler /> : <SecondView allModules={this.props.allModules} allPeriodes={this.props.allPeriodes}/>}
                <HomeSelects />
                <div style={{marginTop: '-4%'}}>
                    {this.props.schedulerData.resources[0] ? null : <WelcomeAnimation />}
                </div>
                <div style={{marginTop: '-5.5%'}}>
                    {this.props.eventInfos.prof ? <EventPanel event={eventInfos.event} prof={eventInfos.prof.toString()} themes={eventInfos.themes} typeEns={eventInfos.typeEns} /> : null}
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return { eventInfos: state.eventInfos, schedulerData: state.schedulerData, isFirstViewActive: state.isFirstViewActive, allModules: state.allModules, allPeriodes: state.allPeriodes }
};

export default connect(mapStateToProps)(Home);