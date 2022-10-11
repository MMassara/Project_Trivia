import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class TriviaQuests extends Component {
  state = {
    arrayResults: [],
    arrayIndex: 0,
    answers: [],
    invalidToken: false,
    showResults: false,
  };

  componentDidMount() {
    this.fetchApi();
  }

  createAnswers = () => {
    const {arrayResults, arrayIndex} = this.state;
    const results = arrayResults[arrayIndex].incorrect_answers.map((element, index) => {
      const incorrectAnswers = {
        name: element,
        testid: `wrong-answer-${index}`,
        isRight: false
      };
      return incorrectAnswers;
    });
    const correct = {
      name: arrayResults[arrayIndex].correct_answer,
      testid: 'correct-answer',
    };
    const answerss = [...results, correct];
    const MULTIPLE = 0.5;
    const shuffle = answerss.sort(() => Math.random() - MULTIPLE);
    this.setState({
      answers: shuffle,
    });
  }

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
    } 
    this.setState({
      arrayResults: response.results, 
    }, () => this.createAnswers());
  };

  handleClick = () => {
    this.setState((prevState) => ({
      arrayIndex: prevState.arrayIndex + 1,
      showResults:false
    }), () => this.createAnswers());
  };

  showResponses = () => {
    this.setState({
      showResults: true,
    })
  }

  render() {
    const { arrayResults, arrayIndex, answers, invalidToken, showResults } = this.state;

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
                        data-testid={ question.testid }
                        onClick={this.showResponses}
                        className={question.testid === 'correct-answer' && showResults === true ? 'green-border' : null || question.isRight === false && showResults === true ? 'red-border' : null }
                      >
                        {question.name}
                      </button>
                    )
                    : (
                      <button
                        key={ question.name }
                        type="button"
                        data-testid={ question.testid }
                        onClick={this.showResponses}
                        className={question.testid === 'correct-answer' && showResults === true ? 'green-border' : null || question.isRight === false && showResults === true ? 'red-border' : null }
                      >
                        {question.name}
                      </button>
                    )
                ))}
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
