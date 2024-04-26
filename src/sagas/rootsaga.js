// sagas/index.js

import { all, takeLatest } from 'redux-saga/effects';
import authSaga from './authSaga';
import { LOGIN_REQUEST } from '../actions/actionTypes';

function* rootSaga() {
  yield all([
    takeLatest(LOGIN_REQUEST, authSaga),
    // Add more sagas here if needed
  ]);
}

export default rootSaga;
