import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { getAllFormations } from '../../actions/homeActions';
import { createModule } from '../../actions/creatingActions';

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
            <div style={{width: 300, margin: '0 auto'}}>
                <h2>Création d'UE</h2> <br />
                <Select
                    onChange={(e) => {this.setState({selectedFormation: e})}}
                    options={this.props.allFormations}
                    placeholder="Choisissez votre formation..."
                /> <br />
                Entrez le nom de l'UE à créer : <br />
                <input type="text" value={this.state.champNomModule} onChange={e => this.handleChange(e)} name="champNomModule" /> <br />
                Entrez le label de l'UE à créer : <br />
                <input type="text" value={this.state.champLabelModule} onChange={e => this.handleChange(e)} name="champLabelModule" />
                <button onClick={() => this.createModule()}>Valider</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { allFormations: state.allFormations };
}

export default connect(mapStateToProps, {getAllFormations, createModule})(CreatingModule);