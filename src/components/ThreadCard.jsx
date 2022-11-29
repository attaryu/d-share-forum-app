import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

import HeaderThreadCard from './HeaderThreadCard';
import ButtonThreadCard from './ButtonThreadCard';
import CategorySplit from './CategorySplit';

import categorySpliter from '../utils/categorySpliter';
import pathName from '../utils/pathName';

function ThreadCard({ thread }) {
  return (
    <section className="mb-16">
      <HeaderThreadCard thread={thread} />

      <article className="bg-white p-6 shadow-xl mt-6 rounded-lg">
        <Link to={`/${pathName.THREAD}/${thread.id}`}>
          <h1 className="font-extrabold text-2xl">{thread.title}</h1>
        </Link>
        <div className="leading-5 max-h-20 overflow-hidden mt-6">
          {parse(thread.body)}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categorySpliter(thread.category).map((category) => (
            <CategorySplit key={category.id} category={category} />
          ))}
        </div>

        <ButtonThreadCard thread={thread} withComment />
      </article>
    </section>
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.objectOf(Array).isRequired,
};

export default ThreadCard;
