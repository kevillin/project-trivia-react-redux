import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import saveUser from './userReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({ tokenReducer, saveUser, questionsReducer });

export default rootReducer;
