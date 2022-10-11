import React, { Component } from 'react';
import Header from '../components/Header';
import TriviaQuests from '../components/TriviaQuests';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <TriviaQuests />
      </>
    );
  }
}
