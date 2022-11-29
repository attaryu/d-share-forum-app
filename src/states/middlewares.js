import checkEmptyObject from '../utils/checkEmptyObject';

function checkAuthentication({ getState }) {
  return (next) => (action) => {
    const { user } = getState();

    if (/(vote)/ig.test(action.type)) {
      if (checkEmptyObject(user)) {
        alert('Please login or register first');
        return;
      }
    }

    return next(action);
  };
}

export default checkAuthentication;
