import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { seeAllUsers } from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator({ users }) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncReceiveUsers() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await seeAllUsers();

      if (data.status === 'fail') alert(data.message);

      dispatch(receiveUsersActionCreator(data.data));
    } catch (message) {
      alert('Failed to get user data');
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncReceiveUsers,
};
