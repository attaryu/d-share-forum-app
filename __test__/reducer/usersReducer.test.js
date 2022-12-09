/*
 Test Flow :
  * Action type not specified
  * Receive leaderboards
    - return data leaderboards
*/

import { ActionType } from '../../states/users/action';
import usersReducer from '../../states/users/reducer';

const globalUsers = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'fulan',
    name: 'Si Fulan',
    email: 'fulan@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

describe('test users reducer', () => {
  it('returns the initial value if no action is specified', () => {
    // arrage
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('returns the new value if the action type is RECEIVE_USERS', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: globalUsers,
      },
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
