import React, { Component } from "react";
import PropTypes from "prop-types";

class TriviaQuests extends Component {
  state = {
    arrayResults: [],
    arrayIndex: 0,
  };

  componentDidMount() {
   this.fetchApi();
  }

  fetchApi = async () => {
    const token = localStorage.getItem("token");
    const request = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`
    );
    const response = await request.json();
    const magicNumber = 3;
    const { history } = this.props;
    if (response.response_code === magicNumber) {
      localStorage.removeItem("token");
      history.push("/");
    } else {
      const results = response.results.map((element) => ({
        ...element,
        shuffledQuestions: this.shuffle([
          ...element.incorrect_answers,
          element.correct_answer,
        ]),
      }));
      this.setState({ arrayResults: results });
    }
  };

  handleClick = () => {
    this.setState((prevState) => ({
      arrayIndex: prevState.arrayIndex + 1,
    }));
  };

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  render() {
    const { arrayResults, arrayIndex } = this.state;

    return (
      <div>
        {arrayResults.length > 0 ? (
          <div>
            <h4 data-testid="question-category">
              {arrayResults[arrayIndex].category}
            </h4>
            <h4 data-testid="question-text">
              {arrayResults[arrayIndex].question}
            </h4>
          </div>
        ) : null}
        {arrayResults.length > 0 ? (
          arrayResults[arrayIndex].type === "boolean" ? (
            <div>
              <button>True</button> <button>False</button>
            </div>
          ) : (
            <div>
              {arrayResults[arrayIndex].shuffledQuestions.map((element) => (<div data-testid='answer-options'>
                <button>{element}</button>
                </div>
              ))}
            </div>
          )
        ) : null}
        <button type="button" onClick={this.handleClick}>
          Next Question
        </button>
      </div>
    );
  }
}
// test
TriviaQuests.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default TriviaQuests;
