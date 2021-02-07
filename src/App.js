import React, {Component} from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import home from "./pages/home";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={`/`} component={home}/>
                </Switch>
            </Router>
        );
    }
}

export default App;

