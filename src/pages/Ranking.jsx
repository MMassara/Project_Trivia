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
        <span className="title">
          Ranking
        </span>
        <title type="text" data-testid="ranking-title">Ranking</title>
        <div className="showRanking">
          {players.length > 0 ? players.map((player, index) => (
            <div key={ index } className="formulario">
              <img src={ player.ranking[0].picture } alt={ `player ${index}` } />
              <div
                data-testid={ `player-name-${index}` }
                className="title"
              >
                {player.ranking[0].name}
              </div>
              <label htmlFor="score" className="title">
                Pontuação
                <div
                  data-testid={ `player-score-${index}` }
                  className="title"
                  id="score"
                >
                  {player.ranking[0].score}
                </div>
              </label>
            </div>)) : null}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clickGoHome }
          className="goHomeButton"
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
