function checkEmptyObject(object = {}) {
  return Object.keys(object).length === 0;
}

export default checkEmptyObject;
