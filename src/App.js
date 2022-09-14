import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';
import Jogo from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <div>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/jogo" component={ Jogo } />
            <Route exact path="/config" component={ Configuracoes } />
            <Route exact path="/feedback" component={ Feedback } />
            <Route exact path="/ranking" component={ Ranking } />
          </Switch>
        </div>
      </header>
    </div>
  );
}
