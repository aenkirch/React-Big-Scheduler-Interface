import React, { Component } from "react";
import { connect } from "react-redux";
import { createGroupe } from '../../actions/creatingActions';
import Select from "react-select";
import { getAllFormations } from '../../actions/homeActions';
import { Form, Button } from 'semantic-ui-react';

class CreatingGroupe extends Component{
    constructor(){
        super();
        this.state = {
            champTypeGroupe: '',
            champNumeroGroupe: '',
            selectedFormation: {}
        }
    }

    componentDidMount = () => { this.props.getAllFormations(); }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    createGroupe = () => {this.props.createGroupe(this.state.selectedFormation.id, this.state.champNumeroGroupe, this.state.champTypeGroupe)};

    render(){
        return(
            <Form style={{margin: '1%'}}>
                <Form.Field>
                    <label>Choisissez votre formation...</label>
                    <Select
                            onChange={(e) => {this.setState({selectedFormation: e})}}
                            options={this.props.allFormations}
                            placeholder="Choisissez votre formation..."
                    />
                </Form.Field>
                <Form.Field>
                    <label>Type du Groupe</label>
                    <input type="text" value={this.state.champTypeGroupe} onChange={e => this.handleChange(e)} name="champTypeGroupe" placeholder='Type du Groupe' />
                </Form.Field>
                <Form.Field>
                    <label>Numéro de Groupe</label>
                    <input type="text" value={this.state.champNumeroGroupe} onChange={e => this.handleChange(e)} name="champNumeroGroupe" placeholder='Numéro de Groupe' />
                </Form.Field>
                <Button onClick={(e) => this.createGroupe(e)}>Valider</Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return { allFormations: state.allFormations };
}

export default connect(mapStateToProps, {getAllFormations, createGroupe})(CreatingGroupe)