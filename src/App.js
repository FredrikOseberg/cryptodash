import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import coinData from './coinData';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import store from './store/store';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Switch>
                        <Route exact path="/" component={props => <Landing data={coinData} />} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
