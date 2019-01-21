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
            selectedModule: {}
        }
    }

    componentDidMount = () => { this.props.getAllModules(); }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    createMatiere = () => {this.props.createMatiere(this.state.selectedModule.value, this.state.champNomMatiere, this.state.champLabelMatiere, this.state.champCouleurMatiere)};

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
                <Button onClick={() => this.createMatiere()}>Valider</Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return { allModules: state.allModules };
}

export default connect(mapStateToProps, {getAllModules, createMatiere})(CreatingMatiere);