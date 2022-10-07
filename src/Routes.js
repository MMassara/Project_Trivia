import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ Configuracoes } />
      </Switch>
    );
  }
}
