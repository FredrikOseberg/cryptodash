import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import { auth, googleAuthProvider } from './firebase';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
      </BrowserRouter>
    );
  }
}

export default App;
