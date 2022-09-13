import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsAction, saveScore } from '../redux/actions/index';
import '../styles/Trivia.css';

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      question: '',
      category: '',
      correctAnswer: '',
      arrayAnswer: [],
      name: '',
      difficult: '',
      clicked: false,
      isDisabled: false,
      timer: 30,
      inicialQuestion: 0,
    };
  }

  componentDidMount() {
    const { dispatch, token } = this.props;
    dispatch(fetchQuestionsAction(token));
    this.getName();
    this.creatingTimer();
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    const { timer, clicked } = this.state;
    if (questions !== prevProps.questions) {
      this.renderQuestions();
    }
    if (timer === 0 && !clicked) {
      clearInterval(this.stop);
      this.setState({ clicked: true, isDisabled: true });
    }
  }

  coutingDifficult = () => {
    const { dispatch } = this.props;
    const { timer, difficult } = this.state;
    const easyQ = 1;
    const mediumQ = 2;
    const hardQ = 3;
    const DEZ = 10;
    if (difficult === 'easy') {
      dispatch(saveScore(DEZ + (timer * easyQ)));
    } if (difficult === 'medium') {
      dispatch(saveScore(DEZ + (timer * mediumQ)));
    } if (difficult === 'hard') {
      dispatch(saveScore(DEZ + (timer * hardQ)));
    }
  };

  creatingTimer = () => {
    const umSegundo = 1000;
    this.stop = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer, clicked } = this.state;
        if (timer === 0 || clicked) clearInterval(this.stop);
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
    const { inicialQuestion } = this.state;
    const INVALID_TOKEN = 3;
    if (questions.response_code === INVALID_TOKEN) {
      localStorage.clear();
      history.push('/');
    } else {
      const IncorrectAnswers = questions.results[inicialQuestion].incorrect_answers;
      const incorrectAnswersMap = IncorrectAnswers.map((incorrect) => ({
        answer: incorrect,
        className: 'incorrect-answer',
      }));
      const correctAnswer = questions.results[inicialQuestion].correct_answer;
      this.setState({
        question: questions.results[inicialQuestion].question,
        category: questions.results[inicialQuestion].category,
        difficult: questions.results[inicialQuestion].difficulty,
        correctAnswer: questions.results[inicialQuestion].correct_answer,
        arrayAnswer: this.shuffleArray([
          ...incorrectAnswersMap,
          {
            answer: correctAnswer, className: 'correct-answer',
          }]),
      });
    }
  };

  nextQuestion = () => {
    this.setState((prevState) => ({
      inicialQuestion: prevState.inicialQuestion + 1,
      clicked: false,
      timer: 30,
    }), () => {
      const { inicialQuestion } = this.state;
      const QUATRO = 4;
      if (inicialQuestion > QUATRO) {
        const { history } = this.props;
        history.push('/feedback');
      } else {
        this.creatingTimer();
        this.renderQuestions();
      }
    });
  };

  colorAnswer = ({ target }) => {
    this.setState({ clicked: true });
    const { correctAnswer } = this.state;
    if (target.innerText === correctAnswer) {
      this.coutingDifficult();
      console.log('acertou mizeravi');
    }
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
    const { score } = this.props;

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
                Score:
                { score }
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
              <div>
                { clicked && (
                  <button
                    data-testid="btn-next"
                    type="button"
                    onClick={ this.nextQuestion }
                  >
                    Next
                  </button>
                )}
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
  score: state.player.score,
});

export default connect(mapStateToProps)(Jogo);

Jogo.propTypes = {
  // email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
