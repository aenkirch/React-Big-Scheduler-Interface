import React, { Component } from "react";
import { Divider, Header, Icon, Table, Grid, Segment } from 'semantic-ui-react';
import { closeEventInfos } from "../../../actions/homeActions";
import { connect } from "react-redux";
import EventEditPanel from "./EventEditPanel";

class EventPanel extends Component{

    render(){
        return (
            <div style={{marginLeft: '30%', marginRight: '30%'}}>
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column>
                            <EventEditPanel event={this.props.event}/>
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

export default connect(null, { closeEventInfos })(EventPanel);