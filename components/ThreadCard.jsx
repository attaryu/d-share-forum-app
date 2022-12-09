import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
        <Link href={`/${pathName.THREAD}/${thread.id}`} className="font-extrabold text-2xl">
          {thread.title}
        </Link>
        <div className="leading-5 max-h-20 overflow-hidden mt-6">
          {thread.body}
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
