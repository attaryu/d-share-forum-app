function getCategory(threads) {
  let categoryAll = [];
  let categoryShorts = [];

  const rawCategory = threads
    .map((thread) => thread.category)
    .filter((thread) => thread)
    .map((category) => category.split(' '));

  rawCategory.forEach((category) => {
    categoryAll = [...categoryAll, ...category].sort();
    categoryShorts = categoryAll
      .sort()
      .filter((categoryCheck, i, self) => categoryCheck !== self[i + 1]);
  });

  const categoryCount = categoryShorts.map((category, id) => (
    {
      id,
      category,
      count: categoryAll.filter((ctg) => ctg === category).length,
    }
  )).sort((categoryA, categoryB) => categoryB.count - categoryA.count);

  return categoryCount;
}

export default getCategory;
