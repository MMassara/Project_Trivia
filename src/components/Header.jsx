import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    userImage: '',
  }

  getImageGravatar = async () => {
    const {email} = this.props;
    const userEmail = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${userEmail}`
    const responseApi = await fetch(url)
    this.setState({
      userImage: responseApi
    })
  }

  render() {
    const { name } = this.props;
    const { userImage } = this.state
    return (
      <div>
        <img data-testid="header-profile-picture" alt="userImage" src={userImage}/>
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email:state.login.email
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
