import getCategory from '../../utils/getCategory';

const ActionType = {
  ADD_CATEGORY: 'ADD_CATEGORY',
};

function addCategoryActionCreator({ threads }) {
  return {
    type: ActionType.ADD_CATEGORY,
    payload: {
      category: getCategory(threads),
    },
  };
}

export {
  ActionType,
  addCategoryActionCreator,
};
