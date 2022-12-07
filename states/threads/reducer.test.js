/*
 Test Flow :
  * Action type not specified
  * Receive thread value
  * Create new thread
  * Up vote thread
    - the first time when pressing vote up
    - pressing up vote when previously pressing down vote
  * Down vote thread
    - the first time when pressing down up
    - pressing down vote when previously pressing up vote
  * Neutral vote thread
    - pressing up vote again
    - pressing down vote again
*/

import { ActionType } from './action';
import threadsReducer from './reducer';

const globalThread = {
  'id': 'thread-1',
  'title': 'Thread Pertama',
  'body': 'Ini adalah thread pertama',
  'category': 'General',
  'createdAt': '2021-06-21T07:00:00.000Z',
  'ownerId': 'users-1',
  'upVotesBy': [],
  'downVotesBy': [],
  'totalComments': 0,
}

describe('test threads reducer', () => {
  it('returns the initial value if no action is specified', () => {
    // arrage
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('returns the new value if the action type is RECEIVE_THREADS', () => {
    // arrage
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        'threads': [
          globalThread,
        ],
      },
    }

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  })

  it('adds a new thread if the action type is CREATE_THREAD', () => {
    // arrage
    const initialState = [
      {
        ...globalThread,
        'id': 'thread-2',
        'title': 'Thread Kedua',
        'body': 'Ini adalah thread kedua',
        'createdAt': '2022-06-21T07:00:00.000Z',
        'ownerId': 'users-2',
      },
    ];

    const action = {
      type: ActionType.CREATE_THREAD,
      payload: {
        'threads': [
          globalThread,
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toContain(action.payload.threads);
  })

  it('adds user id in the upVotesBy property if the action type is UP_VOTE_THREAD', () => {
    // arrage
    const initialState = [
      globalThread,
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    }
    
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).upVotesBy)
      .toContain(action.payload.userId);
  });

  it('add user id in upVotesBy property and remove user id in downVotesBy if action type is UP_VOTE_THREAD', () => {
    // arrage
    const initialState = [
      {
        ...globalThread,
        'downVotesBy': ['users-2'],
      },
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    }
    
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).upVotesBy)
      .toContain(action.payload.userId);
    expect(nextState.find((thread) => thread.id === action.payload.threadId).downVotesBy)
      .not.toContain(action.payload.userId);
  });

  it('adds user id in the downVotesBy property if the action type is DOWN_VOTE_THREAD', () => {
    // arrage
    const initialState = [
      globalThread,
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    }
    
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).downVotesBy)
      .toContain(action.payload.userId);
  });

  it('add user id in downVotes property and remove user id in upVotesBy if action type is DOWN_VOTE_THREAD', () => {
    // arrage
    const initialState = [
      {
        ...globalThread,
        'upVotesBy': ['users-2'],
      },
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    }
    
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).downVotesBy)
      .toContain(action.payload.userId);
    expect(nextState.find((thread) => thread.id === action.payload.threadId).upVotesBy)
      .not.toContain(action.payload.userId);
  });

  it('removes the user id from the upVotesBy property if the action type is NEUTRALIZE_VOTE_THREAD', () => {
    // arrage
    const initialState = [
      {
        ...globalThread,
        'upVotesBy': ['users-2'],
      },
    ];

    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    }
    
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).upVotesBy)
      .not.toContain(action.payload.userId);
    expect(nextState.find((thread) => thread.id === action.payload.threadId).downVotesBy)
      .not.toContain(action.payload.userId);
  });

  it('removes the user id from the downVotesBy property if the action type is NEUTRALIZE_VOTE_THREAD', () => {
    // arrage
    const initialState = [
      {
        ...globalThread,
        'downVotesBy': ['users-2'],
      },
    ];

    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    }
    
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.find((thread) => thread.id === action.payload.threadId).upVotesBy)
      .not.toContain(action.payload.userId);
    expect(nextState.find((thread) => thread.id === action.payload.threadId).downVotesBy)
      .not.toContain(action.payload.userId);
  });
});
