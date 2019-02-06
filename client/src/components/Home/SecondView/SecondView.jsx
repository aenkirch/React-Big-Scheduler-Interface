import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementTime, incrementTime, deleteNbHforMatiere, changePeriodeForMatiere } from '../../../actions/secondViewActions';
import { Table, Card, Icon } from 'semantic-ui-react';

const mapStateToProps = state => {
    return { allMatieres: state.allMatieres, allModules: state.allModules, allPeriodes: state.allPeriodes }
}

// TODO : Faire des actions reliées au +/-/delete qui modifient le allMatieres dans le state
//        split la classe
//        mettre un truc pour déplier le bandeau module (un + ou un - sur la gauche avec float: left)
//        déplacer les horaires d'une période vers une autre si on clique dans la case de l'autre créneau (pour une même matière)


class SecondView extends Component{

    render(){
        let tabNbH = [];

        this.props.allModules.map(module => {
            tabNbH[module.id] = [];
            this.props.allPeriodes.map(periode => {
                tabNbH[module.id][periode.id_period] = [];
                this.props.allMatieres.map(matiere => {
                    if (matiere.id_ue === module.id && matiere.id_period === periode.id_period){
                        console.log(matiere);
                        tabNbH[module.id][periode.id_period][matiere.value] = matiere.nbH;
                    }
                })
            })
        })

        console.log(tabNbH);

        return (
            <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '-1%', marginBottom: '1.5%'}}>
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
                                            <div style={{fontWeight: 'bold'}}>
                                                <Table.Cell key={module.id}>{"Module " + module.id + " : " + module.name}</Table.Cell>
                                            </div>
                                            {this.props.allPeriodes.map(periode => {
                                                return (
                                                    <Table.Cell />
                                                )
                                            })}
                                        </Table.Row>
                                        {this.props.allMatieres.map(matiere => {
                                            if (matiere.id_ue === module.id){
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell>{"- " + matiere.label}</Table.Cell>
                                                        {this.props.allPeriodes.map(periode => {
                                                            if (matiere.id_period === periode.id_period){
                                                                if (matiere.nbH > 0){
                                                                    return(
                                                                        <Table.Cell>
                                                                            <Card fluid>
                                                                                <Card.Content>
                                                                                        <Card.Description style={{color: matiere.couleur}}>
                                                                                            <span style={{fontSize:"120%"}}>{tabNbH[module.id][periode.id_period][matiere.value] + " h"}</span>
                                                                                            <div style={{float: 'right', marginTop: '-0.54%'}}>
                                                                                                <a style={{color: matiere.couleur}} onClick={() => this.props.incrementTime(matiere.nbH, matiere.value)}> <Icon name='plus' size='large'/> </a>
                                                                                                <a style={{color: matiere.couleur}} onClick={() => this.props.decrementTime(matiere.nbH, matiere.value)}> <Icon name='minus' size='large'/> </a>
                                                                                                <a style={{color: matiere.couleur}} onClick={() => this.props.deleteNbHforMatiere(matiere.value)}> <Icon name='trash alternate outline' size='large'/> </a>
                                                                                            </div>
                                                                                        </Card.Description>
                                                                                </Card.Content>
                                                                            </Card>
                                                                        </Table.Cell>
                                                                    )
                                                                }
                                                                else{
                                                                    return( <Table.Cell onClick={() => this.props.incrementTime(matiere.nbH, matiere.value)}></Table.Cell> )
                                                                }
                                                            }
                                                            else{ return( <Table.Cell onClick={() => this.props.changePeriodeForMatiere(periode.id_period, matiere.value)}></Table.Cell> ) }
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

export default connect(mapStateToProps, { incrementTime, decrementTime, deleteNbHforMatiere, changePeriodeForMatiere })(SecondView);