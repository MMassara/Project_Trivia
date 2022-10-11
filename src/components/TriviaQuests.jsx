import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showPoints, showRight } from '../redux/actions';

const correctAnswer = 'correct-answer';
const ten = 10;
const hard = 3;

class TriviaQuests extends Component {
  state = {
    arrayResults: [],
    arrayIndex: 0,
    answers: [],
    invalidToken: false,
    isDisable: false,
    showResults: false,
    score: 0,
    rightAnswers: 0,
  };

  componentDidMount() {
    this.fetchApi();
    this.handleTime();
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { score, rightAnswers } = this.state;
    dispatch(showPoints(score));
    dispatch(showRight(rightAnswers));
  }

  showResponses = () => {
    this.setState({
      showResults: true,
    });
  };

  handleTime = () => {
    this.setState({ seconds: 30 }, () => {
      const NUMBER = 1000;
      const interval = setInterval(() => {
        this.setState(
          (prevState) => ({
            isDisable: false,
            seconds: prevState.seconds - 1,
          }),
          () => {
            const { seconds } = this.state;
            if (seconds === 0) {
              clearInterval(interval);
              this.setState({
                isDisable: true,
              });
            }
          },
        );
      }, NUMBER);
    });
  };

  sumPoints = (event) => {
    const { target } = event;
    const selectedAnswer = target.dataset.testid;
    const { seconds, arrayResults, arrayIndex } = this.state;
    const timer = seconds;
    const dificulty = arrayResults[arrayIndex].difficulty;

    if (selectedAnswer === correctAnswer) {
      if (dificulty === 'hard') {
        this.setState((prevState) => ({
          score: prevState.score + (ten + (timer * hard)),
          rightAnswers: prevState.rightAnswers + 1,
        }));
      } else if (dificulty === 'medium') {
        this.setState((prevState) => ({
          score: prevState.score + (ten + (timer * 2)),
          rightAnswers: prevState.rightAnswers + 1,
        }));
      } else if (dificulty === 'easy') {
        this.setState((prevState) => ({
          score: prevState.score + (ten + (timer * 1)),
          rightAnswers: prevState.rightAnswers + 1,
        }));
      }
    }
  };

  handleClick = () => {
    this.setState(
      (prevState) => ({
        arrayIndex: prevState.arrayIndex + 1,
        showResults: false,
        seconds: 30,
      }),
      () => this.createAnswers(),
    );
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
      this.setState(
        {
          arrayResults: response.results,
        },
        () => this.createAnswers(),
      );
    }
  };

  createAnswers = () => {
    const { arrayResults, arrayIndex } = this.state;
    const results = arrayResults[arrayIndex].incorrect_answers.map(
      (element, index) => {
        const incorrectAnswers = {
          name: element,
          testid: `wrong-answer-${index}`,
          isRight: false,
        };
        return incorrectAnswers;
      },
    );
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

  clickFunctions = (event) => {
    this.showResponses();
    this.sumPoints(event);
  };

  render() {
    const {
      arrayResults,
      arrayIndex,
      answers,
      invalidToken,
      showResults,
      seconds,
      isDisable,
    } = this.state;

    return (
      <div>
        {invalidToken && <Redirect to="/" />}
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
                {answers
                  .map(
                    (question) => (question.name === arrayResults[arrayIndex]
                      .correct_answer
                      ? (
                        <button
                          key={ question.name }
                          type="button"
                          disabled={ isDisable }
                          data-testid={ question.testid }
                          onClick={ this.clickFunctions }
                          className={
                            (question.testid === correctAnswer
                        && showResults === true
                              ? 'green-border'
                              : null)
                        || (question.isRight === false && showResults === true
                          ? 'red-border'
                          : null)
                          }
                        >
                          {question.name}
                        </button>
                      ) : (
                        <button
                          key={ question.name }
                          type="button"
                          disabled={ isDisable }
                          data-testid={ question.testid }
                          onClick={ this.clickFunctions }
                          className={
                            (question.testid === correctAnswer
                        && showResults === true
                              ? 'green-border'
                              : null)
                        || (question.isRight === false && showResults === true
                          ? 'red-border'
                          : null)
                          }
                        >
                          {question.name}
                        </button>
                      )),
                  )}
              </div>
              <div>
                <h1>{seconds}</h1>
              </div>
            </div>
            <button type="button" onClick={ this.handleClick }>
              Next Question
            </button>
          </>
        )}
      </div>
    );
  }
}

TriviaQuests.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(TriviaQuests);
