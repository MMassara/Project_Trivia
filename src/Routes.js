import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
      </Switch>
    );
  }
}
