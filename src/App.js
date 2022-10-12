import React from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/config" component={ Configuracoes } />
        <Route exact path='/feedback' component={ Feedback }/>
      </Switch>
    </div>
  );
}
