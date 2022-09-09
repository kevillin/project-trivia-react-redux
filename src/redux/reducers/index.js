import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import saveUser from './userReducer';

const rootReducer = combineReducers({ tokenReducer, saveUser });

export default rootReducer;
