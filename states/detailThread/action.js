import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_DETAIL_THREAD',
  NEUTRALIZE_VOTE_DETAIL_THREAD: 'NEUTRALIZE_VOTE_DETAIL_THREAD',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
  REMOVE_DETAIL_THREAD: 'REMOVE_DETAIL_THREAD',
};

function receiveDetailThreadActionCreator({ detailThread = {} }) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function upVoteDetailThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteDetailThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function createCommentActionCreator({ comment }) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function removeDetailThreadActionCreator() {
  return {
    type: ActionType.REMOVE_DETAIL_THREAD,
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.seeDetailThread(threadId);

      if (data.status === 'fail') alert(data.message);

      dispatch(receiveDetailThreadActionCreator(data.data));
    } catch (message) {
      alert('Thread details failed to load');
    }

    dispatch(hideLoading());
  };
}

function asyncCreateComment(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { detailThread } = getState();

    try {
      const data = await api.createComment(detailThread.id, content);
      dispatch(createCommentActionCreator(data.data));
    } catch (message) {
      alert('Comment failed to create');
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { user, detailThread } = getState();
    dispatch(upVoteCommentActionCreator(commentId, user.id));

    try {
      await api.upVoteComment(detailThread.id, commentId);
    } catch (message) {
      dispatch(upVoteCommentActionCreator(commentId, user.id));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { user, detailThread } = getState();
    dispatch(downVoteCommentActionCreator(commentId, user.id));

    try {
      await api.downVoteComment(detailThread.id, commentId);
    } catch (message) {
      dispatch(downVoteCommentActionCreator(commentId, user.id));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { user, detailThread } = getState();
    dispatch(neutralizeVoteCommentActionCreator(commentId, user.id));

    try {
      await api.neutralizeVoteComment(detailThread.id, commentId);
    } catch (message) {
      dispatch(neutralizeVoteCommentActionCreator(commentId, user.id));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  neutralizeVoteDetailThreadActionCreator,
  asyncReceiveDetailThread,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
  removeDetailThreadActionCreator,
};
