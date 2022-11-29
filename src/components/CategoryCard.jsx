import React from 'react';
import PropTypes from 'prop-types';

import useSearchURL from '../hooks/useSearchURL';

function CategoryCard({ category }) {
  const [tag, setTag] = useSearchURL('tag');
  const selectedStyle = tag === category.category
    ? 'bg-white border-2 border-accent text-accent'
    : 'bg-accent';

  function selectHashtag() {
    return tag === category.category ? setTag('') : setTag(category.category);
  }

  return (
    <button
      type="button"
      className={`${selectedStyle} px-2.5 py-1 flex gap-2 items-center rounded-md shadow-sm`}
      onClick={selectHashtag}
    >
      <p className="font-semibold text-sm">{category.count}</p>
      <h2 className="font-semibold text-sm">{category.category}</h2>
    </button>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.objectOf(Array).isRequired,
};

export default CategoryCard;
