/*
 Test Flow :
  * Action type not specified
  * Receive Detail Thread
  * Up vote detail thread
    - the first time when pressing vote up but detailThead is empty objects
    - the first time when pressing vote up
    - pressing up vote when previously pressing down vote
  * Down vote detail thread
    - the first time when pressing down up but detailThead is empty objects
    - the first time when pressing down up
    - pressing up vote when previously pressing up vote
  * Neutral vote detail thread
    - pressing up or down vote again but detailThead is empty objects
    - pressing up vote again
    - pressing down vote again
  * Create new comment
  * Up vote comment detail thread
    - the first time when pressing vote up
    - pressing up vote when previously pressing down vote
  * Down vote comment detail thread
    - the first time when pressing down up
    - pressing down vote when previously pressing up vote
  * Neutral vote comment detail thread
    - pressing up vote again
    - pressing down vote again
  * Clear detail thread
    - return empty object
*/

import { ActionType } from './action';
import detailThreadReducer from './reducer';

const globalDetailThread = {
  'id': 'thread-1',
  'title': 'Thread Pertama',
  'body': 'Ini adalah thread pertama',
  'category': 'General',
  'createdAt': '2021-06-21T07:00:00.000Z',
  'owner': {
    'id': 'users-1',
    'name': 'John Doe',
    'avatar': 'https://generated-image-url.jpg',
  },
  'upVotesBy': [],
  'downVotesBy': [],
  'comments': [
    {
      'id': 'comment-1',
      'content': 'Ini adalah komentar pertama',
      'createdAt': '2021-06-21T07:00:00.000Z',
      'owner': {
        'id': 'users-1',
        'name': 'John Doe',
        'avatar': 'https://generated-image-url.jpg',
      },
      'upVotesBy': [],
      'downVotesBy': [],
    },
  ],
};

describe('test detail thread reducer', () => {
  it('returns the initial value if no action is specified', () => {
    // arrage
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('returns thread details if action type is RECEIVE_DETAIL_THREAD', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        detailThread: globalDetailThread,
      }
    }
    
    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('return initial state if action type is UP_VOTE_DETAIL_THREAD but detailThread is empty objects', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.UP_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    }
    
    // action
    const nextState = detailThreadReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual(initialState);
  });
  
  it('adds the user id to the upVotesBy property if the action type is UP_VOTE_DETAIL_THREAD', () => {
    // arrage
    const initialState = globalDetailThread
    const action = {
      type: ActionType.UP_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    }
    
    // action
    const nextState = detailThreadReducer(initialState, action);
    
    // assert
    expect(nextState.upVotesBy).toContain(action.payload.userId);
  });

  it('add user id to upVotesBy property and remove user id from downVoteBy property if action type is UP_VOTE_DETAIL_THREAD', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      downVotesBy: ['users-2'],
    };

    const action = {
      type: ActionType.UP_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    };
    
    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).toContain(action.payload.userId);
    expect(nextState.downVotesBy).not.toContain(action.payload.userId);
  });

  it('return initial state if action type is DOWN_VOTE_DETAIL_THREAD but detailThread is empty objects', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.DOWN_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    }
    
    // action
    const nextState = detailThreadReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual(initialState);
  });
  
  it('adds the user id to the downVotesBy property if the action type is DOWN_VOTE_DETAIL_THREAD', () => {
    // arrage
    const initialState = globalDetailThread
    const action = {
      type: ActionType.DOWN_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    }
    
    // action
    const nextState = detailThreadReducer(initialState, action);
    
    // assert
    expect(nextState.downVotesBy).toContain(action.payload.userId);
  });

  it('add user id to downVotesBy property and remove user id from upVotesBy property if action type is DOWN_VOTE_DETAIL_THREAD', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      upVotesBy: ['users-2'],
    };

    const action = {
      type: ActionType.DOWN_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    };
    
    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.downVotesBy).toContain(action.payload.userId);
    expect(nextState.upVotesBy).not.toContain(action.payload.userId);
  });

  it('return initial state if action type is NEUTRALIZE_VOTE_DETAIL_THREAD but detailThread is empty objects', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    }
    
    // action
    const nextState = detailThreadReducer(initialState, action);
    
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('remove user id from upVotesBy property if action type is NEUTRALIZE_DETAIL_THREAD', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      upVotesBy: ['users-2'],
    }
    
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).not.toContain(action.payload.userId);
  })

  it('remove user id from downVotesBy property if action type is NEUTRALIZE_DETAIL_THREAD', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      downVotesBy: ['users-2'],
    }
    
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2'
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.downVotesBy).not.toContain(action.payload.userId);
  })

  it('add a new comment to the comments property', () => {
    // arrage
    const initialState = { ...globalDetailThread };
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: {
        'comment': {
          'id': 'comment-2',
          'content': 'Ini adalah komentar kedua',
          'createdAt': '2022-06-21T07:00:00.000Z',
          'upVotesBy': [],
          'downVotesBy': [],
          'owner': {
              'id': 'users-1',
              'name': 'John Doe',
              'email': 'john@example.com',
          },
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([action.payload.comment, ...initialState.comments]);
  });

  it('adds the user id to the upVotesBy property if the action type is UP_VOTE_COMMENT', () => {
    // arrage
    const initialState = { ...globalDetailThread };
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      }
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).upVotesBy)
      .toContain(action.payload.userId);
  });

  it('adds user id to upVotesBy property and removes user id from downVotesBy if action type is UP_VOTE_COMMENT', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      comments: [
        {
          ...globalDetailThread.comments[0],
          downVotesBy: ['users-2']
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      }
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).upVotesBy)
      .toContain(action.payload.userId);
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).downVotesBy)
      .not.toContain(action.payload.userId);
  });

  it('adds the user id to the downVotesBy property if the action type is DOWN_VOTE_COMMENT', () => {
    // arrage
    const initialState = { ...globalDetailThread };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      }
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).downVotesBy)
      .toContain(action.payload.userId);
  });

  it('adds user id to downVotesBy property and removes user id from upVotesBy if action type is DOWN_VOTE_COMMENT', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      comments: [
        {
          ...globalDetailThread.comments[0],
          upVotesBy: ['users-2']
        },
      ],
    };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      }
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).downVotesBy)
      .toContain(action.payload.userId);
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).upVotesBy)
      .not.toContain(action.payload.userId);
  });

  it('remove user id from upVotesBy property if action type is NEUTRALIZE_VOTE_COMMENT', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      comments: [
        {
          ...globalDetailThread.comments[0],
          upVotesBy: ['users-2']
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      }
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).upVotesBy)
      .not.toContain(action.payload.userId);
  });

  it('remove user id from downVotesBy property if action type is NEUTRALIZE_VOTE_COMMENT', () => {
    // arrage
    const initialState = {
      ...globalDetailThread,
      comments: [
        {
          ...globalDetailThread.comments[0],
          downVotesBy: ['users-2']
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      }
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments.find((comment) => comment.id === action.payload.commentId).downVotesBy)
      .not.toContain(action.payload.userId);
  });

  it('return empty object if action type is REMOVE_DETAIL_THREAD', () => {
    // arrage
    const initialState = { ...globalDetailThread };
    const action = { type: ActionType.REMOVE_DETAIL_THREAD };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({});
  })
});