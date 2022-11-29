import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { seeLeaderboards } from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator({ leaderboards }) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await seeLeaderboards();

      if (data.status === 'fail') alert(data.message);

      dispatch(receiveLeaderboardsActionCreator(data.data));
    } catch (message) {
      alert('Leaderboard failed to load');
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};
