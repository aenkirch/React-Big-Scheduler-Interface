import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Card, Icon } from 'semantic-ui-react';

const mapStateToProps = state => {
    return { allMatieres: state.allMatieres }
}

//  LIENS OUVERTS AU MOMENT M : REACT DND, REACT SEMANTIC UI (pour les cartes)

// TODO : Faire des cards avec les noms contenus dans thèmes (tables matière) = on parse le JSON
//        Dans UE, on aura un module (genre Anglais) puis au milieu on aura des cards (genre enseignement voc anglais) et on pourra rajouter ou enlever des cards ?

class SecondView extends Component{

    render(){
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
                                                console.log(matiere);
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell>{"- " + matiere.label}</Table.Cell>
                                                        {this.props.allPeriodes.map(periode => {
                                                            if (matiere.id_period === periode.id_period){
                                                                return(
                                                                    <Table.Cell>
                                                                        <Card fluid>
                                                                            <Card.Content>
                                                                                    <Card.Description style={{color: matiere.couleur}}>{tabNbH[module.id][periode.id_period][matiere.id_mat] + " h"}
                                                                                        <div style={{float: 'right', marginTop: '-0.24%'}}>
                                                                                            <Icon name='plus' size='large'/>
                                                                                            <Icon name='minus' size='large'/>
                                                                                            <Icon name='trash alternate outline' size='large'/>
                                                                                        </div>
                                                                                    </Card.Description>
                                                                            </Card.Content>
                                                                        </Card>
                                                                    </Table.Cell>
                                                                )
                                                            }
                                                            else{ return( <Table.Cell onClick={() => console.log(matiere)}></Table.Cell> ) }
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