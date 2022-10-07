import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* import { userLoginAction } from '../redux/actions'; */
import tokenAPI from '../services/tokenAPI';

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

  validatingButton = () => {
    const { name, email } = this.state;
    const isDisabled = !(email.length > 0 && name.length > 0);
    this.setState({ isDisabled });
  };
<<<<<<< HEAD

  submitPlayBtn = async () => {
    const token = await tokenAPI();
    localStorage.setItem('token', token.token);
    const { history } = this.props;
    history.push('/game');
  };

=======
  
>>>>>>> 9b6f986827bcc1e44a20cc41b495ff958a7e7720
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
