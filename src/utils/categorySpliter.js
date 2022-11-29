function categorySpliter(array) {
  return array.split(' ').map(((category, id) => ({ category, id: `${category}-${id}` })));
}

export default categorySpliter;
