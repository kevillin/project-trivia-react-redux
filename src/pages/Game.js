import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';

class Jogo extends Component {
  render() {
    const { name } = this.props;
    // const userEmail = md5(email).toString();
    return (
      <div>
        <img data-testid="header-profile-picture" src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc" alt="imgem-gravatar" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">Score: 0</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // email: state.saveUser.email,
  name: state.saveUser.name,
});

export default connect(mapStateToProps)(Jogo);

Jogo.propTypes = {
  // email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
