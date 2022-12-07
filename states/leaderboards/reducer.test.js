/*
 Test Flow :
  * Action type not specified
  * Receive leaderboards
    - return data leaderboards
*/

import { ActionType } from './action';
import leaderboardsReducer from './reducer';

const globalLeaderboards = [
  {
    'user': {
      'id': 'users-1',
      'name': 'John Doe',
      'email': 'john@example.com',
      'avatar': 'https://generated-image-url.jpg',
    },
    'score': 10,
  },
  {
    'user': {
      'id': 'users-2',
      'name': 'Jane Doe',
      'email': 'jane@example.com',
      'avatar': 'https://generated-image-url.jpg',
    },
    'score': 5,
  }
]

describe('test leaderboards reducer', () => {
  it('returns the initial state if no action is specified', () => {
    // arrage
    const initialState = {};
    const action = { type: 'UNKNOWN' };
    
    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('returns the new value if the action type is RECEIVE_LEADERBOARDS', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: globalLeaderboards,
      }
    };
    
    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});