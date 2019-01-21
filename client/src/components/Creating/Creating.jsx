import React, { Component } from "react";
import { NavLink, Route, HashRouter } from 'react-router-dom'
import CreatingFormation from "./CreatingFormation";
import CreatingGroupe from "./CreatingGroupe";
import CreatingModule from "./CreatingModule";
import CreatingMatiere from "./CreatingMatiere";
import CreatingCreneau from "./CreatingCreneau";
import { Grid, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class Creating extends Component{

    render() {
        return (
            <div>
                <HashRouter>
                        <Grid>

                            <Grid.Column className="header" width={4}>
                                <Menu fluid vertical tabular>
                                    <Menu.Item name="Formation" as={NavLink} exact to='/creating'/>
                                    <Menu.Item name="Groupe" as={NavLink} to='/creating/groupe'/>
                                    <Menu.Item name="Module" as={NavLink} to='/creating/module'/>
                                    <Menu.Item name="Matiere" as={NavLink} to='/creating/matiere'/>
                                    <Menu.Item name="Creneau" as={NavLink} to='/creating/creneau'/>
                                </Menu>
                            </Grid.Column>

                            <Grid.Column className="content" stretched width={12}>
                                <Segment>
                                    <Route exact path="/creating" component={CreatingFormation}/>
                                    <Route path="/creating/groupe" component={CreatingGroupe}/>
                                    <Route path="/creating/module" component={CreatingModule}/>
                                    <Route path="/creating/matiere" component={CreatingMatiere}/>
                                    <Route path="/creating/creneau" component={CreatingCreneau}/>
                                </Segment>
                            </Grid.Column>

                        </Grid>
                </HashRouter>
            </div>
        )
    }
};

export default Creating;