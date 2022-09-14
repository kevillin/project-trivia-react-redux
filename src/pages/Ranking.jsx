import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <section>
        <div data-testid="ranking-title">Ranking</div>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.redirectToHome }
        >
          Home
        </button>
      </section>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};
