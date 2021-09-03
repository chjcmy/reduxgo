import store from '../../store';
import { USER_LOADING_REQUEST } from '../../redux/types';

const loadUser = () => {
  store.dispatch({
    type: USER_LOADING_REQUEST,
    payload: localStorage.getItem('token')
  });
};

export default loadUser;
