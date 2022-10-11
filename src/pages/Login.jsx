import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addName, addEmail } from '../redux/actions/index';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  componentDidMount() {
    this.submitPlayBtn();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validatingButton());
  };

  sucessLogin = () => {
    this.submitPlayBtn();
    const { history, addNames, addEmails } = this.props;
    const { name, email } = this.state;
    history.push('/game');
    addNames(name);
    addEmails(email);
  };

  validatingButton = () => {
    const { name, email } = this.state;
    const isDisabled = !(email.length > 0 && name.length > 0);
    this.setState({ isDisabled });
  };

  localStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  submitPlayBtn = async () => {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(url);
    const response = await request.json();
    this.localStorage('token', response.token);
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
          onClick={ this.sucessLogin }
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

const mapDispatchToProps = (dispatch) => ({
  addNames: (name) => dispatch(addName(name)),
  addEmails: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
