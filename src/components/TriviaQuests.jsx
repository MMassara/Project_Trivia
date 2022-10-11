import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const correctAnswer = 'correct-answer';

class TriviaQuests extends Component {
  state = {
    arrayResults: [],
    arrayIndex: 0,
    answers: [],
    invalidToken: false,
    isDisable: false,
    showResults: false,
  };

  componentDidMount() {
    this.fetchApi();
    this.handleTime();
  }

  createAnswers = () => {
    const { arrayResults, arrayIndex } = this.state;
    const results = arrayResults[arrayIndex].incorrect_answers.map((element, index) => {
      const incorrectAnswers = {
        name: element,
        testid: `wrong-answer-${index}`,
        isRight: false,
      };
      return incorrectAnswers;
    });
    const correct = {
      name: arrayResults[arrayIndex].correct_answer,
      testid: correctAnswer,
    };
    const answerss = [...results, correct];
    const MULTIPLE = 0.5;
    const shuffle = answerss.sort(() => Math.random() - MULTIPLE);
    this.setState({
      answers: shuffle,
    });
  };

  fetchApi = async () => {
    const token = localStorage.getItem('token');
    const request = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const response = await request.json();
    const magicNumber = 3;
    if (!response.results.length && response.response_code === magicNumber) {
      localStorage.setItem('token', '');
      this.setState({
        invalidToken: true,
      });
    } else {
      this.setState({
        arrayResults: response.results,
      }, () => this.createAnswers());
    }
  };

  handleClick = () => {
    this.setState((prevState) => ({
      arrayIndex: prevState.arrayIndex + 1,
      showResults: false,
    }), () => this.createAnswers());
  };

  showResponses = () => {
    this.setState({
      showResults: true,
    });
  };

  handleTime = () => {
    this.setState({ seconds: 30 }, () => {
      const NUMBER = 1000;
      const interval = setInterval(() => {
        this.setState((prevState) => ({
          isDisable: false,
          seconds: prevState.seconds - 1,
        }), () => {
          const { seconds } = this.state;
          if (seconds === 0) {
            clearInterval(interval);
            this.setState({
              isDisable: true,
            });
          }
        });
      }, NUMBER);
    });
  };

  render() {
    const { arrayResults, arrayIndex, answers,
      invalidToken, showResults,
      seconds, isDisable } = this.state;

    return (
      <div>
        { invalidToken && <Redirect to="/" /> }
        {arrayResults.length > 0 && (
          <>
            <div>
              <h4 data-testid="question-category">
                {arrayResults[arrayIndex].category}
              </h4>
              <h4 data-testid="question-text">
                {arrayResults[arrayIndex].question}
              </h4>
            </div>
            <div>
              <div data-testid="answer-options">
                {answers.map((question) => (
                  question.name === arrayResults[arrayIndex].correct_answer
                    ? (
                      <button
                        key={ question.name }
                        type="button"
                        disabled={ isDisable }
                        data-testid={ question.testid }
                        onClick={ this.showResponses }
                        className={ (question.testid === correctAnswer
                        && showResults === true
                          ? 'green-border'
                          : null)
                        || (question.isRight === false
                        && showResults === true
                          ? 'red-border'
                          : null) }
                      >
                        {question.name}
                      </button>
                    )
                    : (
                      <button
                        key={ question.name }
                        type="button"
                        disabled={ isDisable }
                        data-testid={ question.testid }
                        onClick={ this.showResponses }
                        className={ (question.testid === correctAnswer
                        && showResults === true
                          ? 'green-border' : null)
                        || (question.isRight === false
                        && showResults === true
                          ? 'red-border'
                          : null) }
                      >
                        {question.name}
                      </button>
                    )
                ))}
              </div>
              <div>
                <h1>
                  { seconds }
                </h1>
              </div>
            </div>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Next Question
            </button>

          </>
        ) }
      </div>
    );
  }
}

export default TriviaQuests;
