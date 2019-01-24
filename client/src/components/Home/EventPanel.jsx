import React, { Component } from "react";
import { Divider, Header, Icon, Table, Grid, Segment, Form, Button } from 'semantic-ui-react';
import { closeEventInfos } from "../../actions/homeActions";
import { saveEvent } from "../../actions/schedulerActions";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

class EventPanel extends Component{

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
            <div style={{marginLeft: '25%', marginRight: '25%'}}>
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column>
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
                        </Grid.Column>
                        <Grid.Column>
                            <div style={{marginLeft: '3%', marginRight: '3%'}}>
                                <Divider horizontal>
                                    <Header as='h4'>
                                        <Icon name='calendar' />
                                        About this event
                                    </Header>
                                </Divider>
                        
                                <Table definition> 
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell width={1}>Prof</Table.Cell>
                                            <Table.Cell>{this.props.prof}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Thèmes</Table.Cell>
                                            <Table.Cell>{this.props.themes}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Type d'enseignement</Table.Cell>
                                            <Table.Cell>{this.props.typeEns}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </Grid.Column>
                    </Grid>
                    
                    <div className='eventInfos' onClick={this.props.closeEventInfos}>
                        <Divider vertical><Icon name='times circle'/></Divider>
                    </div>
                </Segment>
            </div>
        )
    }
}

export default connect(null, { closeEventInfos, saveEvent })(EventPanel);