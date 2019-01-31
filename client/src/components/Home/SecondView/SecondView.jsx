import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from 'semantic-ui-react';

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

        let tabNbH = [];

        this.props.allModules.map(module => {
            tabNbH[module.id] = [];
            this.props.allPeriodes.map(periode => {
                tabNbH[module.id][periode.id_period] = [];
                this.props.allMatieres.map(matiere => {
                    if (matiere.id_ue === module.id && matiere.id_period === periode.id_period){
                        tabNbH[module.id][periode.id_period][matiere.id_mat] = matiere.nbH;
                    }
                })
            })
        })

        console.log(tabNbH);

        return (
            <div style={{marginLeft: '10%', marginRight: '10%'}}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            {this.props.allPeriodes.map(periode => {
                                return (
                                    <Table.HeaderCell>
                                    { "Période " + periode.id_period + " : " +
                                     new Date(periode.tDeb * 1000).getMonth() + "/" + new Date(periode.tDeb * 1000).getFullYear()
                                    + " - " +
                                     new Date(periode.tFin * 1000).getMonth() + "/" + new Date(periode.tFin * 1000).getFullYear() }
                                    </Table.HeaderCell>
                                )
                            })}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {this.props.allModules.map(module => {
                                return (
                                    <React.Fragment>
                                        <Table.Row active>
                                            <Table.Cell key={module.id}>{"Module " + module.id + " : " + module.name}</Table.Cell>
                                            {this.props.allPeriodes.map(periode => {
                                                return (
                                                    <Table.Cell>
                                                        {tabSommeNbH[module.id][periode.id_period]}
                                                    </Table.Cell>
                                                )
                                            })}
                                        </Table.Row>
                                        {this.props.allMatieres.map(matiere => {
                                            if (matiere.id_ue === module.id){
                                                console.log(matiere);
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell>{"- " + matiere.label}</Table.Cell>
                                                        {this.props.allPeriodes.map(periode => {
                                                            if (matiere.id_period === periode.id_period){
                                                                return(
                                                                    <Table.Cell>{tabNbH[module.id][periode.id_period][matiere.id_mat]}</Table.Cell>
                                                                )
                                                            }
                                                            else{ return( <Table.Cell></Table.Cell> ) }
                                                        })}
                                                    </Table.Row>
                                                )
                                            }
                                        })}
                                    </React.Fragment>
                                )
                            })}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SecondView);