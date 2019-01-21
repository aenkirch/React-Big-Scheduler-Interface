import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Home from './Home/Home';
import Creating from './Creating/Creating';
import {ToastContainer} from 'react-toastify';    // PASSER SUR SEMANTIC UI POUR LA CONF AVEC UN ONGLET PAR CONF (ajout de créneau, etc...)

class Main extends Component {
    render() {
      return (
        <HashRouter>
          <div style={{margin: '1%'}}>
            <ul className="header">
                <li><NavLink exact to="/">home</NavLink></li>
                <li><NavLink to="/creating">creating</NavLink></li>
                <li><NavLink to="/editing">editing</NavLink></li>
                <li><NavLink to="/sharing">sharing</NavLink></li>
                <li><NavLink to="/contributing">contributing</NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/creating" component={Creating}/>
            </div>
            <ToastContainer />
          </div>
        </HashRouter>
      );
    }
}

export default Main;