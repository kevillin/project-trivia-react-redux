import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsAction } from '../redux/actions/index';
import '../styles/Trivia.css';
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
      clicked: false,
      isDisabled: false,
      timer: 30,
    };
  }

  componentDidMount() {
    const { dispatch, token } = this.props;
    dispatch(fetchQuestionsAction(token));
    this.getName();
    const trintaSegundos = 30000;
    this.creatingTimer();
    setTimeout(() => this.setState({
      isDisabled: true,
    }), trintaSegundos);
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    if (questions !== prevProps.questions) {
      this.renderQuestions();
    }
  }

  coutingDifficult = () => {
    const { questions } = this.props;
    const { timer } = this.state;
    const easyQ = 1;
    const mediumQ = 2;
    const hardQ = 3;
    const DEZ = 10;
    const difficultQuestion = questions.results[0].difficult;
    if (difficultQuestion === 'easy') {
      return (DEZ + timer * easyQ);
    } if (difficultQuestion === 'medium') {
      return (DEZ + timer * mediumQ);
    } if (difficultQuestion === 'hard') {
      return (DEZ + timer * hardQ);
    }
  };

  creatingTimer = () => {
    const umSegundo = 1000;
    setInterval(() => {
      const { timer } = this.state;
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        if (timer === 0) {
          return clearInterval(timer);
        }
      });
    }, umSegundo);
  };

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
    const INVALID_TOKEN = 3;
    if (questions.response_code === INVALID_TOKEN) {
      localStorage.clear();
      history.push('/');
    } else {
      const IncorrectAnswers = questions.results[0].incorrect_answers;
      const incorrectAnswersMap = IncorrectAnswers.map((incorrect) => ({
        answer: incorrect,
        className: 'incorrect-answer',
      }));
      const correctAnswer = questions.results[0].correct_answer;
      this.setState({
        question: questions.results[0].question,
        category: questions.results[0].category,
        correctAnswer: questions.results[0].correct_answer,
        arrayAnswer: this.shuffleArray([
          ...incorrectAnswersMap,
          {
            answer: correctAnswer, className: 'correct-answer',
          }]),
      });
    }
  };

  colorAnswer = () => {
    this.setState({ clicked: true });
    this.coutingDifficult();
    console.log(this.coutingDifficult());
  };

  render() {
    const {
      question,
      category,
      name,
      arrayAnswer,
      correctAnswer,
      clicked,
      isDisabled,
      timer,
    } = this.state;

    return (
      <div>
        {
          question && (
            <section>

              <img
                data-testid="header-profile-picture"
                src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
                alt="imagem-gravatar"
              />

              <h2
                data-testid="header-player-name"
              >
                {name}
              </h2>

              <h2
                data-testid="header-score"
              >
                Score: 0
              </h2>

              <h1
                data-testid="question-category"
              >
                {category}
              </h1>
              <div>
                Timer:
                {` 00:${timer}`}
              </div>
              <span
                data-testid="question-text"
              >
                {question}
              </span>

              <div data-testid="answer-options">
                {
                  arrayAnswer.map((answer, index) => (
                    <button
                      data-testid={
                        answer.answer === correctAnswer
                          ? 'correct-answer'
                          : `wrong-answer-${index}`
                      }
                      onClick={ (event) => this.colorAnswer(event) }
                      type="button"
                      key={ answer.answer }
                      className={ clicked && answer.className }
                      disabled={ isDisabled }
                    >
                      {answer.answer}
                    </button>
                  ))
                }
              </div>
            </section>
          )
        }
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
