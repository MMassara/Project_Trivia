import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  messageFeedback = () => {
    const NUMBER_TRES = 3;
    const { assertions } = this.props;

    if (assertions >= NUMBER_TRES) return 'Well Done!';
    return 'Could be better...';
  };

  clickPlayAgain = () => {
    const { history } = this.props;
    this.makeRank();
    history.push('/');
  };

  clickPlayRanking = () => {
    const { history } = this.props;
    this.makeRank();
    history.push('/ranking');
  };

  makeRank = () => {
    const { name, score, gravatarEmail } = this.props;
    const token = localStorage.getItem('token');
    const player = { ranking: [{ name, score, picture: gravatarEmail }], token };
    const allPlayers = JSON.parse(localStorage.getItem('players'));
    allPlayers.push(player);
    localStorage.setItem('players', JSON.stringify(allPlayers));
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <main className="formulario">
          <div
            data-testid="feedback-text"
            className="title"
          >
            {this.messageFeedback()}
          </div>
          <label className="title" htmlFor="score">
            Pontuação
            <div
              data-testid="feedback-total-score"
              className="title"
              id="score"
            >
              { score }
            </div>
          </label>
          <label className="title" htmlFor="assertions">
            Acertos
            <div
              data-testid="feedback-total-question"
              className="title"
              id="assertions"
            >
              { assertions }
            </div>
          </label>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.clickPlayAgain }
            className="btn"
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.clickPlayRanking }
            className="btn"
          >
            Ranking
          </button>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: number,
  score: number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
