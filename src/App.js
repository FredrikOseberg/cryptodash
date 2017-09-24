import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import coinData from './coinData';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import './App.css';

class App extends Component {
    render() {
        const signedIn = this.props.auth.status === 'SIGNED_IN';
        const landingComponent = signedIn ? Dashboard : props => <Landing data={coinData} />;
        console.log(landingComponent);
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={landingComponent} />
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
