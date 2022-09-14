import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { name, score, assertions } = this.props;
    const TRES = 3;
    return (
      <header>
        <div data-testid="feedback-text">Feedback</div>
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="imagem-gravatar"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">{ score }</h2>
        { assertions >= TRES
          ? <h1 data-testid="feedback-text">Well Done!</h1>
          : <h1 data-testid="feedback-text">Could be better...</h1>}
        <div>
          <h1
            data-testid="feedback-total-score"
          >
            { score }
          </h1>
          <h2
            data-testid="feedback-total-question"
          >
            { assertions }
          </h2>
        </div>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  name: state.saveUser.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
