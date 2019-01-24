import React from 'react';
import Scheduler from 'react-big-scheduler';
import withDragDropContext from '../../withDnDContext';
import { prevClick, nextClick, onViewChange, onSelectDate, saveEvent, deleteEvent, moveEvent, updateEventEnd, updateEventStart, eventClicked } from '../../actions/schedulerActions';
import { connect } from "react-redux";
import 'react-big-scheduler/lib/css/style.css';

const mapStateToProps = state => {
    return {
        viewModel: state.schedulerData 
    }
};

export class ConnectedScheduler extends React.Component {

    prevClick = () => { this.props.prevClick() }
    nextClick = () => { this.props.nextClick() }
    onViewChange = (schedulerData, view) => { this.props.onViewChange(schedulerData, view) }
    onSelectDate = (schedulerData, date) => { this.props.onSelectDate(schedulerData, date) }
    op1 = (schedulerData, event) => { this.props.saveEvent(schedulerData, event) }
    op2 = (schedulerData, event) => { this.props.deleteEvent(schedulerData, event) }
    moveEvent = (schedulerData, event, slotId, slotName, start, end) => { this.props.moveEvent(schedulerData, event, slotId, slotName, start, end) }
    updateEventStart = (schedulerData, event, newStart) => { this.props.updateEventStart(schedulerData, event, newStart) }
    updateEventEnd = (schedulerData, event, newEnd) => { this.props.updateEventEnd(schedulerData, event, newEnd) }
    eventClicked = (schedulerData, event) => {this.props.eventClicked(schedulerData, event)}

    render(){
        return(
            <div>
                <Scheduler
                    schedulerData={this.props.viewModel}
                    prevClick={this.prevClick}
                    nextClick={this.nextClick}
                    onViewChange={this.onViewChange}
                    onSelectDate={this.onSelectDate}
                    eventItemClick={this.eventClicked}
                    viewEventClick={this.op1}           
                    viewEventText="Sauvegarder"
                    viewEvent2Click={this.op2}
                    viewEvent2Text="Supprimer"
                    moveEvent={this.moveEvent}
                    updateEventStart={this.updateEventStart}    // AJOUTER UN ENCART "INFOS SUR LE CRENEAU" AU CLIC
                    updateEventEnd={this.updateEventEnd}        // VOIR ONGLET 'SPECIFICATIONS' dans categorie divider de react semantic ui 
                />
            </div>
        )
    }
}

const MyScheduler = connect(mapStateToProps, { prevClick, nextClick, onViewChange, onSelectDate, saveEvent, deleteEvent, moveEvent, updateEventEnd, updateEventStart, eventClicked })(ConnectedScheduler)

export default withDragDropContext(MyScheduler)
