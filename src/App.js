import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import coinData from './coinData';
import DashboardWrapper from './components/DashboardWrapper/DashboardWrapper';
import Register from './components/Register/Register';
import SignInWrapper from './components/SignIn/SignInWrapper';
import ViewAllCurrencies from './components/ViewAllCurrencies/ViewAllCurrencies';
import './App.css';

class App extends Component {
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {
        const isMobile = window.innerWidth <= 790;
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={props => <DashboardWrapper coinData={coinData} isMobile={isMobile} />}
                    />
                    <Route path="/register" component={Register} />
                    <Route
                        path="/signin"
                        render={props => <SignInWrapper isMobile={isMobile} history={props.history} />}
                    />
                    <Route path="/all" component={ViewAllCurrencies} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(App);
