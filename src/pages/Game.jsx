import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsAction } from '../redux/actions/index';
// import md5 from 'crypto-js/md5';

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      question: '',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { token } = this.props;
    await dispatch(fetchQuestionsAction(token));
    const { questions } = this.props;
    const MAX = 4;
    const RANDOM = Math.floor(Math.random() * (0 + MAX));
    this.setState({
      question: questions[RANDOM].question,
    });
  }

  render() {
    const { question } = this.state;
    const { name } = this.props;
    // const userEmail = md5(email).toString();
    return (
      <div>
        <img data-testid="header-profile-picture" src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc" alt="imgem-gravatar" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">Score: 0</h2>
        <span>{ question }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  name: state.saveUser.name,
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Jogo);

Jogo.propTypes = {
  // email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
