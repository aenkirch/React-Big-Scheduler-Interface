import React, { Component } from "react";
import { Divider, Header, Icon, Table } from 'semantic-ui-react';

class EventInfos extends Component{
    render(){
        return (
            <div style={{marginLeft: '40%', marginRight: '40%'}}>
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
        )
    }
}

export default EventInfos;