import React, { Component } from "react";
import { connect } from "react-redux";
import { createFormation } from '../../actions/creatingActions';
import { Button, Form } from 'semantic-ui-react';

class CreatingFormation extends Component{
    constructor(){
        super();
        this.state = {
            champFormation: '',
            champFormationLabel: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    createFormation = () => {this.props.createFormation(this.state.champFormation, this.state.champFormationLabel)};

    render(){
        return(
            <Form style={{margin: '1%'}}>
                <Form.Field>
                    <label>Nom de la Formation</label>
                    <input type="text" value={this.state.champFormation} onChange={e => this.handleChange(e)} name="champFormation" placeholder='Nom de Formation' />
                </Form.Field>
                <Form.Field>
                    <label>Label de la Formation</label>
                    <input type="text" value={this.state.champFormationLabel} onChange={e => this.handleChange(e)} name="champFormationLabel" placeholder='Label de la Formation' />
                </Form.Field>
                <Button onClick={(e) => this.createFormation(e)}>Valider</Button>
            </Form>
        )
    }
}

export default connect(null, {createFormation})(CreatingFormation)