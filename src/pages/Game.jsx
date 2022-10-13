import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import TriviaQuests from '../components/TriviaQuests';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <TriviaQuests history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
