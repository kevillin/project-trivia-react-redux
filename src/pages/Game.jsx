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
      category: '',
      correctAnswer: '',
      arrayAnswer: [],
      name: '',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { token } = this.props;
    await dispatch(fetchQuestionsAction(token));
    this.renderQuestions();
    this.getName();
  }

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  getName = () => {
    const name = localStorage.getItem('name');
    this.setState({
      name,
    });
  };

  renderQuestions = () => {
    const { questions, history } = this.props;
    if (questions.length === 0) {
      localStorage.setItem('token', '');
      history.push('/');
    } else {
      // const MAX = 4;
      // const RANDOM = Math.floor(Math.random() * (0 + MAX));
      const IncoAnswers = questions[0].incorrect_answers;
      IncoAnswers.push(questions[0].correct_answer);
      this.setState({
        question: questions[0].question,
        category: questions[0].category,
        correctAnswer: questions[0].correct_answer,
        arrayAnswer: this.shuffleArray(IncoAnswers),
      });
    }
  };

  render() {
    const { question, category, name, arrayAnswer } = this.state;

    // const userEmail = md5(email).toString();
    return (
      <section>

        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="imgem-gravatar"
        />

        <h2
          data-testid="header-player-name"
        >
          { name }
        </h2>

        <h2
          data-testid="header-score"
        >
          Score: 0
        </h2>

        <h1
          data-testid="question-category"
        >
          { category }
        </h1>

        <span
          data-testid="question-text"
        >
          { question }
        </span>

        <div data-testid="answer-options">
          {
            arrayAnswer.map((incorAnswer, index) => (
              <button
                data-testid={ `wrong-answer-${index}` }
                type="button"
                key={ incorAnswer }
              >
                { incorAnswer }
              </button>
            ))
          }
        </div>
      </section>
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
