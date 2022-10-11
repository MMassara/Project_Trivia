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

  getImageGravatar = async () => {
    const { email } = this.props;
    const userEmail = md5(email).toString();
    const urlApi = `https://www.gravatar.com/avatar/${userEmail}`;
    const responseApi = await fetch(urlApi);
    this.setState({
      userImage: responseApi.url,
    });
  };

  render() {
    const { name, points } = this.props;
    const { userImage } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="userImage" src={ userImage } />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{points}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  points: state.login.points
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
