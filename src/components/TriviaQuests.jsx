import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class TriviaQuests extends Component {
  state = {
    arrayResults: [],
    arrayIndex: 0,
    answers: '',
    invalidToken: false,
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const token = localStorage.getItem('token');
    const request = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const response = await request.json();
    const magicNumber = 3;
    console.log(response);
    if (!response.results.length && response.response_code === magicNumber) {
      localStorage.setItem('token', '');
      this.setState({
        invalidToken: true,
      });
    } else {
      const results = response.results[0].incorrect_answers.map((element, index) => {
        const incorrectAnswers = {
          name: element,
          testid: `wrong-answer-${index}`,
        };
        return incorrectAnswers;
      });
      const correct = {
        name: response.results[0].correct_answer,
        testid: 'correct-answer',
      };
      const answerss = [...results, correct];
      const MULTIPLE = 0.5;
      const shuffle = answerss.sort(() => Math.random() - MULTIPLE);
      this.setState({
        answers: shuffle,
      });
    }
    this.setState({
      arrayResults: response.results,
    });
  };

  handleClick = () => {
    this.setState((prevState) => ({
      arrayIndex: prevState.arrayIndex + 1,
    }));
  };

  render() {
    const { arrayResults, arrayIndex, answers, invalidToken } = this.state;

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
                      >
                        {question.name}
                      </button>
                    )
                    : (
                      <button
                        key={ question.name }
                        type="button"
                        data-testid={ question.testid }
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
