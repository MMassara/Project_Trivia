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
    if (localStorage.getItem('players') === null) {
      localStorage.setItem('players', JSON.stringify([]));
    }
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
      <div className="formulario">
        <div className="input-container">
          <input
            id="name"
            type="text"
            name="name"
            className="input"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ name }
          />
          <div className="legenda-p" />
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            value={ email }
          />
          <div className="legenda-p" />
        </div>
        <button
          type="button"
          data-testid="btn-play"
          className="btn"
          onClick={ this.sucessLogin }
          disabled={ isDisabled }
        >
          Play
        </button>
        <button
          type="button"
          className="btn"
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
