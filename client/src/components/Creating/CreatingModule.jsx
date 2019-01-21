import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { getAllFormations } from '../../actions/homeActions';
import { createModule } from '../../actions/creatingActions';
import { Form, Button } from 'semantic-ui-react';

class CreatingModule extends Component{
    constructor(){
        super();
        this.state = {
            champNomModule: '',
            champLabelModule: '',
            selectedFormation: {}
        }
    }

    componentDidMount = () => { this.props.getAllFormations(); }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    createModule = () => {this.props.createModule(this.state.selectedFormation.id, this.state.champNomModule, this.state.champLabelModule)};

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
                    <label>Nom du Module</label>
                    <input type="text" value={this.state.champNomModule} onChange={e => this.handleChange(e)} name="champNomModule" placeholder='Nom du Module' />
                </Form.Field>
                <Form.Field>
                    <label>Label du Module</label>
                    <input type="text" value={this.state.champLabelModule} onChange={e => this.handleChange(e)} name="champLabelModule" placeholder='Label du Module' />
                </Form.Field>
                <Button onClick={() => this.createModule()}>Valider</Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return { allFormations: state.allFormations };
}

export default connect(mapStateToProps, {getAllFormations, createModule})(CreatingModule);