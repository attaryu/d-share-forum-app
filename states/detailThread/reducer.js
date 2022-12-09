import checkEmptyObject from '../../utils/checkEmptyObject';
import { ActionType } from './action';

function detailThreadReducer(detailThread = {}, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;

    case ActionType.CREATE_COMMENT:
      return { ...detailThread, comments: [action.payload.comment, ...detailThread.comments] };

    case ActionType.UP_VOTE_DETAIL_THREAD:
      if (checkEmptyObject(detailThread)) return detailThread;

      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId),
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : [...detailThread.upVotesBy, action.payload.userId],
      };

    case ActionType.DOWN_VOTE_DETAIL_THREAD:
      if (checkEmptyObject(detailThread)) return detailThread;

      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter((id) => id !== action.payload.userId)
          : [...detailThread.downVotesBy, action.payload.userId],
      };

    case ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD:
      if (checkEmptyObject(detailThread)) return detailThread;

      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
        downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId),
      };

    case ActionType.UP_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? [...comment.upVotesBy.filter((id) => id !== action.payload.userId)]
                : [...comment.upVotesBy, action.payload.userId],
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }

          return comment;
        }),
      };

    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? [...comment.downVotesBy.filter((id) => id !== action.payload.userId)]
                : [...comment.downVotesBy, action.payload.userId],
            };
          }

          return comment;
        }),
      };

    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
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
