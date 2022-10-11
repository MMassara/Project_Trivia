import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    userImage: '',
  };

  componentDidMount() {
    this.getImageGravatar();
  }

  getImageGravatar = () => {
    const { email } = this.props;
    const userEmail = md5(email).toString();
    const urlApi = `https://www.gravatar.com/avatar/${userEmail}`;
    this.setState({
      userImage: urlApi,
    });
  };

  render() {
    const { name, points } = this.props;
    const { userImage } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="userImage" src={ userImage } />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{` || score: ${points}`}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  points: state.login.points,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
