import React from 'react';
import PropTypes from 'prop-types';

function CategorySplit({ category }) {
  return (
    <p className="font-semibold text-lg text-sky-500">{`#${category.category}`}</p>
  );
}

CategorySplit.propTypes = {
  category: PropTypes.objectOf(Array).isRequired,
};

export default CategorySplit;
