import axios from 'axios';
import {
  put, call, takeEvery, fork, all
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { POST_LOADING_FAILURE, POST_LOADING_REQUEST, POST_LOADING_SUCCESS } from '../types';

const loadPostAPI = () => axios.get('/bookshow');

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result, 'loadPosts');
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e
    });
    yield push('/');
  }
}

function* watchLoadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts)
  ]);
}
