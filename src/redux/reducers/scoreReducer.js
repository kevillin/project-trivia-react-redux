import { SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

function scoreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default scoreReducer;
