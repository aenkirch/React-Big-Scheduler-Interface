import React, { Component } from "react";
import { connect } from "react-redux";
import { createGroupe } from '../../actions/creatingActions';
import Select from "react-select";
import { getAllFormations } from '../../actions/homeActions';

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
            <div style={{width: 300, margin: '0 auto'}}>
                <h2>Création de groupe</h2> <br />
                <div style={{marginBottom:'5%'}}>
                    <Select
                        options={this.props.allFormations}
                        onChange={(e) => {this.setState({selectedFormation: e})}}
                        placeholder="Choisissez votre formation..."
                    />
                </div>
                Entrez le type du groupe à créer : <br />
                <input type="text" value={this.state.champTypeGroupe} onChange={e => this.handleChange(e)} name="champTypeGroupe" /> <br /> <br />
                Entrez le numéro du groupe à créer : <br />
                <input type="text" value={this.state.champNumeroGroupe} onChange={e => this.handleChange(e)} name="champNumeroGroupe" />
                <button onClick={(e) => this.createGroupe(e)}>Valider</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { allFormations: state.allFormations };
}

export default connect(mapStateToProps, {getAllFormations, createGroupe})(CreatingGroupe)