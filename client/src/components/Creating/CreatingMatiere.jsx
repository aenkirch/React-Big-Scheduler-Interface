import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { createMatiere, getAllModules } from '../../actions/creatingActions';
import { CompactPicker } from "react-color";
import { Form, Button } from 'semantic-ui-react';

class CreatingMatiere extends Component{
    constructor(){
        super();
        this.state = {
            champNomMatiere: '',
            champLabelMatiere: '',
            champCouleurMatiere: '#fff',
            selectedModule: {},
            champThemeMatiere: '',
            champTypeMatiere: ''
        }
    }

    componentDidMount = () => { this.props.getAllModules(); }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    createMatiere = () => {
        let state = this.state;
        this.props.createMatiere(state.selectedModule.value, state.champNomMatiere, state.champLabelMatiere, state.champCouleurMatiere, state.champThemeMatiere, state.champTypeMatiere)
    };

    render(){
        return(
            <Form style={{margin: '1%'}}>
                <Form.Field>
                    <label>Choisissez votre module...</label>
                    <Select
                        onChange={(e) => {this.setState({selectedModule: e})}}
                        options={this.props.allModules}
                        placeholder="Choisissez votre module..."
                    />
                </Form.Field>
                <Form.Field>
                    <label>Nom de la matière</label>
                    <input type="text" value={this.state.champNomMatiere} onChange={e => this.handleChange(e)} name="champNomMatiere" placeholder='Nom de la matière' />
                </Form.Field>
                <Form.Field>
                    <label>Label de la matière</label>
                    <input type="text" value={this.state.champLabelMatiere} onChange={e => this.handleChange(e)} name="champLabelMatiere" placeholder='Label de la matière' />
                </Form.Field>
                <Form.Field>
                    <label>Couleur de la matière</label>
                    <CompactPicker color={this.state.champCouleurMatiere} onChangeComplete={(e) => {this.setState({champCouleurMatiere: e.hex})}}/>
                </Form.Field>
                <Form.Field>
                    <label>Thème de la matière</label>
                    <input type="text" value={this.state.champThemeMatiere} onChange={e => this.handleChange(e)} name="champThemeMatiere" placeholder='Thème de la matière' />
                </Form.Field>
                <Form.Field>
                    <label>Type d'enseignement de la matière</label>
                    <input type="text" value={this.state.champTypeMatiere} onChange={e => this.handleChange(e)} name="champTypeMatiere" placeholder="Type d'enseignement de la matière" />
                </Form.Field>
                <Button onClick={() => this.createMatiere()}>Valider</Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return { allModules: state.allModules };
}

export default connect(mapStateToProps, {getAllModules, createMatiere})(CreatingMatiere);