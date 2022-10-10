import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addName } from '../redux/actions/index';
/* import { userLoginAction } from '../redux/actions'; */
import tokenAPI from '../services/tokenAPI';

import { addName, addEmail } from '../redux/actions/index';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validatingButton());
  };


  sucessLogin = () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    history.push('/game');
    dispatch(addName(name));
    dispatch(addEmail(email));
  };
  
  validatingButton = () => {
    const { name, email } = this.state;
    const isDisabled = !(email.length > 0 && name.length > 0);
    this.setState({ isDisabled });
  };

  submitPlayBtn = async () => {
    const token = await tokenAPI();
    localStorage.setItem('token', token.token);
    const { history, dispatch } = this.props;
    const { name } = this.state;
    history.push('/game');
    dispatch(addName(name));
  };

  settings = () => {
    const { history: { push } } = this.props;
    push('/config');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.submitPlayBtn }
          disabled={ isDisabled }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
