import { ActionType } from './action';

function categoryReducer(category = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_CATEGORY:
      return action.payload.category;
    default:
      return category;
  }
}

export default categoryReducer;
