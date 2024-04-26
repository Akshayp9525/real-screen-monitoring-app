// sagas/authSaga.js

import { takeEvery, put, call } from 'redux-saga/effects';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actions/actionTypes';
// import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../actions/authActions';
// import { loginAPI } from '../api/authAPI'; // Import your login API function

function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    // const user = yield call(loginAPI, username, password); // Call the login API
    yield put(LOGIN_SUCCESS()); // Dispatch success action
  } catch (error) {
    yield put(LOGIN_FAILURE(error)); // Dispatch failure action
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga); // Listen for LOGIN_REQUEST actions
}

export default authSaga;
