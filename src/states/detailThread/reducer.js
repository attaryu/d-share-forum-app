import checkEmptyObject from '../../utils/checkEmptyObject';
import { ActionType } from './action';

function detailThreadReducer(detailThread = {}, action = {}) {
  const { payload } = action;

  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return payload.detailThread;

    case ActionType.CREATE_COMMENT:
      return { ...detailThread, comments: [payload.comment, ...detailThread.comments] };

    case ActionType.UP_VOTE_DETAIL_THREAD:
      if (checkEmptyObject(detailThread)) return detailThread;

      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== payload.userId),
        upVotesBy: detailThread.upVotesBy.includes(payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== payload.userId)
          : [...detailThread.upVotesBy, payload.userId],
      };

    case ActionType.DOWN_VOTE_DETAIL_THREAD:
      if (checkEmptyObject(detailThread)) return detailThread;

      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== payload.userId),
        downVotesBy: detailThread.downVotesBy.includes(payload.userId)
          ? detailThread.downVotesBy.filter((id) => id !== payload.userId)
          : [...detailThread.downVotesBy, payload.userId],
      };

    case ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD:
      if (checkEmptyObject(detailThread)) return detailThread;

      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== payload.userId),
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== payload.userId),
      };

    case ActionType.UP_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(payload.userId)
                ? [...comment.upVotesBy.filter((id) => id !== payload.userId)]
                : [...comment.upVotesBy, payload.userId],
              downVotesBy: comment.downVotesBy.filter((id) => id !== payload.userId),
            };
          }

          return comment;
        }),
      };

    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== payload.userId),
              downVotesBy: comment.downVotesBy.includes(payload.userId)
                ? [...comment.downVotesBy.filter((id) => id !== payload.userId)]
                : [...comment.downVotesBy, payload.userId],
            };
          }

          return comment;
        }),
      };

    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== payload.userId),
            };
          }

          return comment;
        }),
      };

    case ActionType.REMOVE_DETAIL_THREAD:
      return {};

    default:
      return detailThread;
  }
}

export default detailThreadReducer;
