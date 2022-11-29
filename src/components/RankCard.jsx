import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import pathName from '../utils/pathName';

function RankCard({ ranker, ranking }) {
  const { user } = useSelector((states) => states);
  const thisMe = user.id === ranker.user.id ? 'border-4 border-sky-500' : '';

  return (
    <div className={`flex items-center bg-white my-7 rounded-md shadow-lg px-6 py-3 ${thisMe}`}>
      <p className="font-bold">{`${ranking + 1}.`}</p>
      <img src={ranker.user.avatar} alt={`${ranker.user.name} avatar`} className="w-10 rounded-full ml-4" />
      <Link to={`/${pathName.PROFILE}/${ranker.user.id}`} className="ml-4 font-bold">{ranker.user.name}</Link>
      <p className="ml-auto font-semibold text-sm">{ranker.score}</p>
    </div>
  );
}

RankCard.propTypes = {
  ranker: PropTypes.objectOf(Array).isRequired,
  ranking: PropTypes.number.isRequired,
};

export default RankCard;
