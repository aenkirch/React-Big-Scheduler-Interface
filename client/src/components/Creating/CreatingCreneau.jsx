import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { createCreneau, getAllMatieres, getAllProfs, getAllSalles } from '../../actions/creatingActions';
import { getAllFormations, getAllGroupes } from '../../actions/homeActions';
import DatePicker from "react-datepicker";
import { Form, Button } from 'semantic-ui-react';

import "react-datepicker/dist/react-datepicker.css";

class CreatingCreneau extends Component{
    constructor(){
        super();
        this.state = {
            selectedFormation: {},
            selectedGroupe: {},
            selectedMatiere: {},
            selectedProf: {},
            selectedSalle: {},
            debutCreneau: new Date(),
            finCreneau: new Date()
        }
    }

    componentDidMount = () => { this.props.getAllFormations(); this.props.getAllProfs(); this.props.getAllSalles(); }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    loadFormGroupe = (event) => {
        this.setState({selectedFormation: event});
        this.props.getAllMatieres(event.id);
        this.props.getAllGroupes(event.id);
    }

    createCreneau = () => { this.props.createCreneau(this.state.debutCreneau, this.state.finCreneau, 
                            this.state.selectedMatiere.value, this.state.selectedProf.value, this.state.selectedGroupe.value, 
                            this.state.selectedSalle.value  )};

    render(){
        return(
            <Form style={{margin: '1%'}}>
                <Form.Field>
                    <label>Choisissez votre formation...</label>
                    <Select
                            options={this.props.allFormations}
                            onChange={this.loadFormGroupe}
                            placeholder="Choisissez votre formation..."
                    />
                </Form.Field>
                <Form.Field>
                    <label>Choisissez votre groupe...</label>
                    <Select
                            options={this.props.allGroupes}
                            onChange={(e) => {this.setState({selectedGroupe: e})}}
                            placeholder="Choisissez votre groupe..."
                    />
                </Form.Field>
                <Form.Field>
                    <label>Choisissez votre matière...</label>
                    <Select
                        onChange={e => this.setState({ selectedMatiere: e })}
                        options={this.props.allMatieres}
                        placeholder="Choisissez votre matière..."
                    />
                </Form.Field>
                <Form.Field>
                    <label>Choisissez le professeur...</label>
                    <Select
                        onChange={e => this.setState({ selectedProf: e })}
                        options={this.props.allProfs}
                        placeholder="Choisissez le professeur..."
                    />
                </Form.Field>
                <Form.Field>
                    <label>Choisissez la salle...</label>
                    <Select
                        onChange={e => this.setState({ selectedSalle: e })}
                        options={this.props.allSalles}
                        placeholder="Choisissez la salle..."
                    />
                </Form.Field>
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
                <Button onClick={(e) => this.createCreneau(e)}>Valider</Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return { 
        allFormations: state.allFormations,
        allGroupes: state.allGroupes,
        allMatieres: state.allMatieres,
        allProfs: state.allProfs,
        allSalles: state.allSalles
    };
}

export default connect(mapStateToProps, {getAllFormations, getAllGroupes, getAllMatieres, getAllProfs, getAllSalles, createCreneau})(CreatingCreneau);