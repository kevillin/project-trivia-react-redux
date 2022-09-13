import { SAVE_SCORE, ACERTOU_QUESTION } from '../actions';

const INITIAL_STATE = {
  score: 0,
  correct: 0,
  // incorrect: 0,
};

function scoreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ACERTOU_QUESTION:
    return {
      ...state,
      correct: state.correct + action.payload,
    };
  // case ERROU_QUESTION:
  //   return {
  //     ...state,
  //     incorrect: state.incorrect + action.payload,
  //   };
  default:
    return state;
  }
}

export default scoreReducer;
