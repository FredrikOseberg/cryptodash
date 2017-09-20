import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import coinData from './coinData';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            clickedExpandBox: false,
            selectedCurrencies: []
        };

        this.handleClickedExpand = this.handleClickedExpand.bind(this);
        this.addCurrencyToState = this.addCurrencyToState.bind(this);
        this.removeCurrencyFromState = this.removeCurrencyFromState.bind(this);
    }
    // Handles the state for the search box that opens on the landing pages
    handleClickedExpand() {
        this.setState({ clickedExpandBox: !this.state.clickedExpandBox });
    }
    // Adds currency to the application state. Is passed down to the individual currency card
    addCurrencyToState(object) {
        const newState = this.state.selectedCurrencies;
        newState.push(object);
        this.setState({ selectedCurrencies: newState });
    }
    // Removes currency from application state. Is passed down to the individual currency card
    removeCurrencyFromState(object) {
        const newState = [],
            currentState = this.state.selectedCurrencies;
        currentState.forEach(obj => {
            if (obj.name !== object.name) {
                newState.push(obj);
            }
        });
        this.setState({ selectedCurrencies: newState });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={props => (
                            <Landing
                                data={coinData}
                                handleClickedExpand={this.handleClickedExpand}
                                addCurrencyToState={this.addCurrencyToState}
                                removeCurrencyFromState={this.removeCurrencyFromState}
                                selectedCurrencies={this.state.selectedCurrencies}
                                clickedExpandBox={this.state.clickedExpandBox}
                            />
                        )}
                    />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
