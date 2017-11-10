import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { requireAuthentication } from './components/HoC/SignedInRedirect';
import coinData from './coinData';
import DashboardWrapper from './components/DashboardWrapper/DashboardWrapper';
import RegisterWrapper from './components/Register/RegisterWrapper';
import SignInWrapper from './components/SignIn/SignInWrapper';
import FrontendViewAllCurrencies from './components/Frontend/FrontendViewAllCurrencies';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AdminPanel from './components/Admin/AdminPanel/AdminPanel';
import Blog from './components/Frontend/Blog/Blog';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={props => <DashboardWrapper coinData={coinData} />} />
                    <Route path="/register" component={requireAuthentication(RegisterWrapper)} />
                    <Route path="/signin" component={requireAuthentication(SignInWrapper)} />
                    <Route path="/all" component={FrontendViewAllCurrencies} />} />
                    <Route path="/resetpassword" component={ForgotPassword} />
                    <Route path="/admin" component={AdminPanel} />
                    <Route path="/blog" component={Blog} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App);
