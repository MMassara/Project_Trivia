import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.showRanking();
  }

  clickGoHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  showRanking = () => {
    const allPlayers = JSON.parse(localStorage.getItem('players'));
    const allPlayersSorted = allPlayers
      .sort((a, b) => b.ranking[0].score - a.ranking[0].score);
    this.setState({
      players: allPlayersSorted,
    });
  };

  render() {
    const { players } = this.state;
    return (
      <div>
        Ranking
        <title type="text" data-testid="ranking-title">ranking</title>
        {players.length > 0 ? players.map((player, index) => (
          <div key={ index }>
            <img src={ player.ranking[0].picture } alt={ `player ${index}` } />
            <div data-testid={ `player-name-${index}` }>{player.ranking[0].name}</div>
            <div data-testid={ `player-score-${index}` }>{player.ranking[0].score}</div>
          </div>)) : null}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clickGoHome }
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;
