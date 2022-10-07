import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" alt="userImage" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">Pontos:</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
