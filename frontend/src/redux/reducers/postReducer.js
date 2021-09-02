import {
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST, POST_DETAIL_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS, POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS
} from '../types';

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: '',
  postCount: '',
  loading: false,
  error: '',
  creatorId: '',
  categoryFindResult: '',
  title: '',
  subject: '',
  searchBy: '',
  searchResult: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false
      };
    case POST_UPLOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      };
    case POST_UPLOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false
      };
    case POST_UPLOADING_FAILURE:
      return {
        ...state,
        loading: false
      };
    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        creatorId: action.payload.User.name,
        postDetail: action.payload,
        title: action.payload.title,
        subject: action.payload.subject,
        loading: false
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
