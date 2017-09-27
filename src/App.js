import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import coinData from './coinData';
import DashboardWrapper from './components/DashboardWrapper/DashboardWrapper';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={props => <DashboardWrapper coinData={coinData} />} />
                    <Route path="/register" component={Register} />
                    <Route path="/signin" component={SignIn} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App);
