import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name, score, correct } = this.props;
    const TRES = 3;
    return (
      <header>
        <div data-testid="feedback-text">Feedback</div>
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="imagem-gravatar"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">{score}</h2>
        {correct >= TRES
          ? <h1 data-testid="feedback-text">Well Done!</h1>
          : <h1 data-testid="feedback-text">Could be better...</h1>}
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  name: state.saveUser.name,
  score: state.player.score,
  correct: state.player.correct,
});

Feedback.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
