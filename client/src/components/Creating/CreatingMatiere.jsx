import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { createMatiere, getAllModules } from '../../actions/creatingActions';
import { TwitterPicker } from "react-color";

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
            <div style={{width: 300, margin: '0 auto'}}>
                <h2>Création de matière</h2> <br />
                <Select
                    onChange={(e) => {this.setState({selectedModule: e})}}
                    options={this.props.allModules}
                    placeholder="Choisissez votre module..."
                /> <br />
                Entrez le nom de la matière à créer : <br />
                <input type="text" value={this.state.champNomMatiere} onChange={e => this.handleChange(e)} name="champNomMatiere" /> <br />
                Entrez le label de la matière à créer : <br />
                <input type="text" value={this.state.champLabelMatiere} onChange={e => this.handleChange(e)} name="champLabelMatiere" /> <br />
                Choisissez la couleur des créneaux de cette matière: <br />
                <div style={{marginTop: "5%"}}>
                    <TwitterPicker color={this.state.champCouleurMatiere} onChangeComplete={(e) => {this.setState({champCouleurMatiere: e.hex})}}/>
                </div> <br />
                <button onClick={() => this.createMatiere()}>Valider</button> <br />
            </div>
        )
    }
}

function mapStateToProps(state){
    return { allModules: state.allModules };
}

export default connect(mapStateToProps, {getAllModules, createMatiere})(CreatingMatiere);