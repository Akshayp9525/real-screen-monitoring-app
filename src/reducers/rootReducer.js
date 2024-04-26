// reducers/index.js

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { LOGOUT } from '../actions/actionTypes';
const appReducer = combineReducers({
  auth: authReducer,
  // combine:
});
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
