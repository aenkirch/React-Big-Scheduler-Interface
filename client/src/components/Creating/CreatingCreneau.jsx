import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { /*createCreneau, */getAllMatieres, getAllProfs, getAllSalles } from '../../actions/creatingActions';
import { getAllFormations, getAllGroupes } from '../../actions/homeActions';

class CreatingCreneau extends Component{
    constructor(){
        super();
        this.state = {
            selectedFormation: {},
            selectedGroupe: {},
            selectedMatiere: {},
            selectedProf: {},
            selectedSalle: {}
        }
    }

    componentDidMount = () => { this.props.getAllFormations(); this.props.getAllMatieres(); this.props.getAllProfs(); this.props.getAllSalles(); }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    loadFormGroupe = (event) => {
        this.setState({selectedFormation: event});
        this.props.getAllGroupes(event.id);
    }

    createMatiere = () => {this.props.createMatiere(this.state.selectedModule.value, this.state.champNomMatiere, this.state.champLabelMatiere, this.state.champCouleurMatiere)};

    render(){
        return(
            <div style={{width: 300, margin: '0 auto'}}>
                <h2>Creation de créneau</h2> <br />
                <div style={{marginBottom: '2%'}}>
                    <Select
                            options={this.props.allFormations}
                            onChange={this.loadFormGroupe}
                            placeholder="Choisissez votre formation..."
                    />
                </div>
                <div style={{marginBottom: '2%'}}>
                    <Select
                            options={this.props.allGroupes}
                            onChange={(e) => {this.setState({selectedGroupe: e})}}
                            placeholder="Choisissez votre groupe..."
                    />
                </div>
                <div style={{marginBottom: '2%'}}>
                    <Select
                        onChange={e => this.setState({ selectedMatiere: e })}
                        options={this.props.allMatieres}
                        placeholder="Choisissez votre matière..."
                    />
                </div>
                <div style={{marginBottom: '2%'}}>
                    <Select
                        onChange={e => this.setState({ selectedProf: e })}
                        options={this.props.allProfs}
                        placeholder="Choisissez le professeur..."
                    />
                </div>
                <Select
                    onChange={e => this.setState({ selectedSalle: e })}
                    options={this.props.allSalles}
                    placeholder="Choisissez la salle..."
                /> <br />
                Entrez le début du créneau : <br />
                <input type="text" placeholder="ex : 2018-10-17 15:00:00" value={this.state.debutCreneau} onChange={e => this.handleChange(e)} name="debutCreneau" /> <br />
                Entrez la fin du créneau : <br />
                <input type="text" placeholder="ex : 2018-10-17 18:00:00" value={this.state.finCreneau} onChange={e => this.handleChange(e)} name="finCreneau" /> <br />
                <button onClick={(e) => this.createCreneau(e)}>Valider</button> <br /> <br />
            </div>
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

export default connect(mapStateToProps, {getAllFormations, getAllGroupes, getAllMatieres, getAllProfs, getAllSalles/*, createCreneau*/})(CreatingCreneau);