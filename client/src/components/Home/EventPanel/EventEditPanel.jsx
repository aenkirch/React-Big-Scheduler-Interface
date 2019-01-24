import React, { Component } from "react";
import { Divider, Header, Icon, Form, Button } from 'semantic-ui-react';
import { saveEvent } from "../../../actions/schedulerActions";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

class EventEditPanel extends Component{
    
    constructor(){
        super();

        this.state = {
            debutCreneau: new Date(),
            finCreneau: new Date()
        }
    }

    componentWillMount = () => {
        this.setState({debutCreneau: this.props.event.start, finCreneau: this.props.event.end})
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };

    saveEventEdit = () => {
        let tempEvent = this.props.event;
        tempEvent.start = this.state.debutCreneau;
        tempEvent.end = this.state.finCreneau;
        this.props.saveEvent(null, tempEvent);
    }

    render(){
        return (
            <div style={{marginLeft: '3%', marginRight: '3%'}}>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='calendar minus' />
                        Edit this event
                    </Header>
                </Divider>
        
                <Form style={{margin: '1%'}}>
                    <Form.Field>
                        <label>Début du créneau</label>
                        <DatePicker
                            selected={this.state.debutCreneau}
                            onChange={(e) => {this.setState({debutCreneau: e})}}
                            showTimeSelect
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd h:mm:ss"
                            timeCaption="time"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Fin du créneau</label>
                        <DatePicker
                            selected={this.state.finCreneau}
                            onChange={(e) => {this.setState({finCreneau: e})}}
                            showTimeSelect
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd h:mm:ss"
                            timeCaption="time"
                        />
                    </Form.Field>
                    <Button onClick={() => this.saveEventEdit()}>Valider</Button>
                </Form>
            </div>
        )
    }
}

export default connect(null, { saveEvent })(EventEditPanel);