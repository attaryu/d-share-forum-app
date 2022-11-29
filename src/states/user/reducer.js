import { ActionType } from './action';

function userReducer(user = {}, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USER:
      return action.payload.user ?? user;
    case ActionType.REMOVE_USER:
      sessionStorage.clear('TOKENS');
      return {};
    default:
      return user;
  }
}

export default userReducer;
