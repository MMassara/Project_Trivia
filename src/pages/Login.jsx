import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validatingButton());
  };

  validatingButton = () => {
    const { name, email } = this.state;
    const isDisabled = !(email.length > 0 && name.length > 0);
    this.setState({ isDisabled });
  };
  
  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.validatingButton }
          disabled={ isDisabled }
        >
          Play
        </button>
      </div>
    );
  }
}
