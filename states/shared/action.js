import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { addUserActionCreator } from '../user/action';
import { addCategoryActionCreator } from '../category/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveLeaderboardsActionCreator } from '../leaderboards/action';
import {
  receiveThreadsActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
} from '../threads/action';
import {
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  neutralizeVoteDetailThreadActionCreator,
} from '../detailThread/action';

import api from '../../utils/api';

function asyncLoginUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const logged = await api.login({ email, password });

      if (logged.status === 'fail') alert(logged.message);

      const data = await api.seeOwnProfile();
      dispatch(addUserActionCreator(data.data));
    } catch (message) {
      alert('Login failed');
    }

    dispatch(hideLoading());
  };
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threads = await api.seeAllThreads();
      const users = await api.seeAllUsers();
      const leaderboards = await api.seeLeaderboards();

      dispatch(receiveThreadsActionCreator(threads.data));
      dispatch(addCategoryActionCreator(threads.data));
      dispatch(receiveUsersActionCreator(users.data));
      dispatch(receiveLeaderboardsActionCreator(leaderboards.data));
    } catch (message) {
      alert('Threads failed to load');
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { user } = getState();

    dispatch(upVoteThreadActionCreator(threadId, user.id));
    dispatch(upVoteDetailThreadActionCreator(threadId, user.id));

    try {
      await api.upVoteThread(threadId);
    } catch (message) {
      dispatch(upVoteThreadActionCreator(threadId, user.id));
      dispatch(upVoteDetailThreadActionCreator(threadId, user.id));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { user } = getState();

    dispatch(downVoteThreadActionCreator(threadId, user.id));
    dispatch(downVoteDetailThreadActionCreator(threadId, user.id));

    try {
      await api.downVoteThread(threadId);
    } catch (message) {
      dispatch(downVoteThreadActionCreator(threadId, user.id));
      dispatch(downVoteDetailThreadActionCreator(threadId, user.id));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { user } = getState();

    dispatch(neutralizeVoteThreadActionCreator(threadId, user.id));
    dispatch(neutralizeVoteDetailThreadActionCreator(threadId, user.id));

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (message) {
      dispatch(neutralizeVoteThreadActionCreator(threadId, user.id));
      dispatch(neutralizeVoteDetailThreadActionCreator(threadId, user.id));
    }

    dispatch(hideLoading());
  };
}

export {
  asyncLoginUser,
  asyncReceiveThreads,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};
