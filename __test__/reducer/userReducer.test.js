/*
 Test Flow :
  * Action type not specified
  * Receive user data
    - failed receive user data
    - success receive user data
  * Remove data user
*/

import { ActionType } from '../../states/user/action';
import userReducer from '../../states/user/reducer';

const globalUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('test user reducer', () => {
  it('returns the initial value if no action is specified', () => {
    // arrage
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = userReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('returns an empty object if the action type is RECEIVE_USER and also the user failed to login', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.RECEIVE_USER,
      payload: {
        message: 'failed message',
        status: 'fail',
      },
    };

    // action
    const nextState = userReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('returns user data if the action type is RECEIVE_USER and also the user was successfully logged in', () => {
    // arrage
    const initialState = {};
    const action = {
      type: ActionType.RECEIVE_USER,
      payload: {
        user: globalUser,
      },
    };

    // action
    const nextState = userReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.user);
  });

  it('returns an empty object when the action type is REMOVE_USER', () => {
    // arrage
    const initialState = { ...globalUser };
    const action = { type: ActionType.REMOVE_USER };

    // action
    const nextState = userReducer(initialState, action);

    // assert
    expect(nextState).toEqual({});
  });
});
