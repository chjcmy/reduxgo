import axios from 'axios';
import {
  put, call, takeEvery, fork, all
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS
} from '../types';

const loadPostAPI = () => axios.get('/bookshow');

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result.data, 'loadPosts');
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

const uploadPostAPI = (payload) => {
  debugger;
  const token = payload.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  axios.post('/re/bookcreate', payload, config);
};

function* uploadPosts(action) {
  try {
    debugger;
    console.log(action, 'uploadPost');
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result.data, 'uploadPosts');
    console(result);
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data
    });
    yield put(push(`/post/${result}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e
    });
    yield push('/');
  }
}

function* watchupLoadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchupLoadPosts)
  ]);
}
