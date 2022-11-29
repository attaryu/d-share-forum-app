import { ActionType } from './action';

function registerUserReducer(registerUser = {}, action = {}) {
  switch (action.type) {
    case ActionType.ADD_TEMPORARY_DATA_USER:
      return action.payload.user;
    default:
      return registerUser;
  }
}

export default registerUserReducer;
