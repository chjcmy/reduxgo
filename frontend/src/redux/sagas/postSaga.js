import axios from 'axios';
import {
  put, call, takeEvery, fork, all
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST, POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST, POST_DETAIL_LOADING_SUCCESS,
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
    yield put(push('/'));
  }
}

function* watchupLoadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

const loadPostDetailAPI = (payload) => axios.get(`/bookread/${payload}`);

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data
    });
    yield put(push(`/post/${result.data.id}`));
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

const loadPostDeleteAPI = (payload) => axios.delete(`/bookdelete/${payload}`);

function* loadPostDelete(action) {
  try {
    const result = yield call(loadPostDeleteAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e
    });
  }
}

function* watchloadPostDelete() {
  yield takeEvery(POST_DELETE_REQUEST, loadPostDelete);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchupLoadPosts),
    fork(watchloadPostDetail),
    fork(watchloadPostDelete)

  ]);
}
