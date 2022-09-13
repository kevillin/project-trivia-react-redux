import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import saveUser from './userReducer';
import questionsReducer from './questionsReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({
  tokenReducer,
  saveUser,
  questionsReducer,
  player: scoreReducer });

export default rootReducer;
