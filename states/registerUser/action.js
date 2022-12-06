import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { registerUser } from '../../utils/api';

const ActionType = {
  ADD_TEMPORARY_DATA_USER: 'ADD_TEMPORARY_DATA_USER',
};

function addTemporaryDataUserActionCreator({ user }) {
  return {
    type: ActionType.ADD_TEMPORARY_DATA_USER,
    payload: {
      user,
    },
  };
}

function asyncRegisterUser(userForm) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await registerUser(userForm);

      if (data.status === 'fail') alert(data.message);

      dispatch(addTemporaryDataUserActionCreator(data.data));
    } catch (message) {
      alert('Register failed');
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncRegisterUser,
};
