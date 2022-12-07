import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER',
  REMOVE_USER: 'REMOVE_USER',
};

function addUserActionCreator({ user = {} }) {
  return {
    type: ActionType.RECEIVE_USER,
    payload: {
      user,
    },
  };
}

function removeUserActionCreator() {
  return {
    type: ActionType.REMOVE_USER,
  };
}

function asyncAddUser() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.seeOwnProfile();

      if (data.status === 'fail') alert(data.message);

      dispatch(addUserActionCreator(data.data));
    } catch (message) {
      alert('Auto login failed');
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  addUserActionCreator,
  asyncAddUser,
  removeUserActionCreator,
};
