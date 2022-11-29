import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  const { payload } = action;

  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return payload.threads;

    case ActionType.CREATE_THREAD:
      return [payload.thread, ...threads];

    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.filter((id) => id !== payload.userId),
            upVotesBy: thread.upVotesBy.includes(payload.userId)
              ? thread.upVotesBy.filter((id) => id !== payload.userId)
              : [...thread.upVotesBy, payload.userId],
          };
        }

        return thread;
      });

    case ActionType.DOWN_VOTE_THREAD: {
      return threads.map((thread) => {
        if (thread.id === payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== payload.userId),
            downVotesBy: thread.downVotesBy.includes(payload.userId)
              ? thread.downVotesBy.filter((id) => id !== payload.userId)
              : [...thread.downVotesBy, payload.userId],
          };
        }

        return thread;
      });
    }

    case ActionType.NEUTRALIZE_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== payload.userId),
          };
        }

        return thread;
      });

    default:
      return threads;
  }
}

export default threadsReducer;
