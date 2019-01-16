import React, { Component } from "react";
import { connect } from "react-redux";
import { createFormation } from '../../actions/creatingActions';

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
            <div style={{width: 300, margin: '0 auto'}}>
                <h2>Création de formation</h2> <br />
                <div>
                    Entrez un nom de formation à créer : <br />
                    <input type="text" value={this.state.champFormation} onChange={e => this.handleChange(e)} name="champFormation" />
                </div>
                    <br />
                <div>
                    Entrez le label de la formation: <br />
                    <input type="text" value={this.state.champFormationLabel} onChange={e => this.handleChange(e)} name="champFormationLabel" />
                    <button onClick={(e) => this.createFormation(e)}>Valider</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {createFormation})(CreatingFormation)