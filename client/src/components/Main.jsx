import React, {Component} from "react";
import { connect } from "react-redux";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Home from './Home/Home';
import Creating from './Creating/Creating';
import {ToastContainer} from 'react-toastify';
import { Icon, Button } from 'semantic-ui-react';
import { showFirstView, showSecondView } from '../actions/mainActions';

/*  
    * This class handles the "single page design" of the app using React Router
    * 
    * It runs all the components the app need to run to be started
    * 
*/

class Main extends Component {

    render() {
      return (
        <HashRouter>
          <div style={{margin: '1%', marginRight: '7%', marginLeft: '7%'}}>
            <ul className="header">
                <li><NavLink exact to="/"><Icon name='calendar alternate' size='big'/></NavLink></li>
                <li><NavLink to="/creating">creating</NavLink></li>
                <li><NavLink to="/admin">admin</NavLink></li>
                <li><NavLink to="/contributing">contributing</NavLink></li>
                <li><NavLink to="/settings">settings</NavLink></li>
                <li style={{marginLeft: '55%'}}>
                  <Button.Group>
                    <Button onClick={this.props.showFirstView}>View one</Button>
                    <Button.Or />
                    <Button onClick={this.props.showSecondView}>View two</Button>
                  </Button.Group>
                </li>
            </ul>
            <div style={{margin:'3%', marginTop: '3.5%'}}>
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

export default connect(null, {showFirstView, showSecondView})(Main);