import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from 'semantic-ui-react';

const mapStateToProps = state => {
    return { allMatieres: state.allMatieres }
}

class SecondView extends Component{

    render(){
        let tabSommeNbH = [];

        this.props.allModules.map(module => {
            tabSommeNbH[module.id] = [];
            this.props.allPeriodes.map(periode => {
                tabSommeNbH[module.id][periode.id_period] = 0;
                this.props.allMatieres.map(matiere => {
                    if (matiere.id_ue === module.id && matiere.id_period === periode.id_period){
                        tabSommeNbH[module.id][periode.id_period] += matiere.nbH;
                    }
                })
            })
        })

        return (
            <div style={{marginLeft: '10%', marginRight: '10%'}}>
                <Table celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            {this.props.allPeriodes.map(periode => {
                                return (
                                    <Table.HeaderCell>
                                    { new Date(periode.tDeb * 1000).getMonth() + "/" + new Date(periode.tDeb * 1000).getFullYear()
                                    + " - " +
                                     new Date(periode.tFin * 1000).getMonth() + "/" + new Date(periode.tFin * 1000).getFullYear() }
                                    </Table.HeaderCell>
                                )
                            })}
                            <Table.HeaderCell>Total</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {this.props.allModules.map(module => {
                                let sommePeriode = 0;
                                return (
                                    <Table.Row>
                                        <Table.Cell key={module.id}>{module.name}</Table.Cell>
                                        {this.props.allPeriodes.map(periode => {
                                            sommePeriode += tabSommeNbH[module.id][periode.id_period];
                                            return (
                                                <Table.Cell>
                                                    <Button compact circular basic color='red' style={{margin: '3%'}}>-</Button>
                                                    {tabSommeNbH[module.id][periode.id_period]}
                                                    <Button compact circular basic color='green' style={{margin: '3%'}}>+</Button>
                                                </Table.Cell>
                                            )
                                        })}
                                        <Table.Cell>{sommePeriode}</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SecondView);