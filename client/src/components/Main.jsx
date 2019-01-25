import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Home from './Home/Home';
import Creating from './Creating/Creating';
import {ToastContainer} from 'react-toastify';    // DEMARRER L'ONGLET ADMIN (AVEC AJOUTS PROFS / ETC)
import { Icon } from 'semantic-ui-react';

class Main extends Component {
    render() {
      return (
        <HashRouter>
          <div style={{margin: '1%'}}>
            <ul className="header">
                <li><NavLink exact to="/"><Icon name='calendar alternate' size='big'/></NavLink></li>
                <li><NavLink to="/creating">creating</NavLink></li>
                <li><NavLink to="/admin">admin</NavLink></li>
                <li><NavLink to="/contributing">contributing</NavLink></li>
                <li><NavLink to="/settings">settings</NavLink></li>
            </ul>
            <div style={{margin:'2%', marginTop: '3%'}}>
                <Route exact path="/" component={Home}/>
                <Route path="/creating" component={Creating}/>
            </div>
            <ToastContainer />
            <div className="footer">Checkout our code on <a target="_blank" rel="noopener noreferrer" href="http://www.github.com/aenkirch" >GitHub</a> <Icon name='code'/></div>
          </div>
        </HashRouter>
      );
    }
}

export default Main;