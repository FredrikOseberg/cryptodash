import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import coinData from './coinData';
import DashboardWrapper from './components/DashboardWrapper/DashboardWrapper';
import RegisterWrapper from './components/Register/RegisterWrapper';
import SignInWrapper from './components/SignIn/SignInWrapper';
import ViewAllCurrencies from './components/ViewAllCurrencies/ViewAllCurrencies';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={props => <DashboardWrapper coinData={coinData} />} />
                    <Route path="/register" component={RegisterWrapper} />
                    <Route path="/signin" component={SignInWrapper} />
                    <Route path="/all" component={ViewAllCurrencies} />
                    <Route path="/resetpassword" component={ForgotPassword} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App);
