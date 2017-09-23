import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import coinData from './coinData';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={props => <Landing data={coinData} />} />
                    <Route path="/register" component={Register} />
                    <Route path="/signin" component={SignIn} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
