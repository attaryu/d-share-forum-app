import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import pathName from '../utils/pathName';

import One from '../asset/1st.avif';
import Two from '../asset/2nd.avif';
import Three from '../asset/3rd.avif';

function TopRankDisplay({ ranker, ranking }) {
  const { user } = useSelector((states) => states);
  const thisMe = user.id === ranker.user.id ? 'border-4 p-0.5 border-sky-500' : '';

  let rankingCheck;
  let iconTopRank;
  let numberColor;
  let scale;

  if (ranking === '1') {
    rankingCheck = '1st';
    numberColor = 'text-orange-500';
    scale = 'scale-125';
    iconTopRank = One;
  }

  if (ranking === '2') {
    rankingCheck = '2nd';
    numberColor = 'text-zinc-400';
    scale = 'scale-110';
    iconTopRank = Two;
  }

  if (ranking === '3') {
    rankingCheck = '3rd';
    numberColor = 'text-amber-800';
    scale = 'scale-100';
    iconTopRank = Three;
  }

  return (
    <div className={`flex flex-col items-center ${scale}`}>
      <img src={iconTopRank} alt="" className="w-7" />
      <p className={`${numberColor} font-bold text-xl mt-1`}>{rankingCheck}</p>
      <img src={ranker.user.avatar} alt="" className={`rounded-full w-24 mt-2 mb-8 ${thisMe}`} />
      <Link to={`/${pathName.PROFILE}/${ranker.user.id}`} className="font-bold truncate w-5/6 text-center text-xl">{ranker.user.name}</Link>
      <p className="font-semibold">{ranker.score}</p>
    </div>
  );
}

TopRankDisplay.propTypes = {
  ranker: PropTypes.objectOf(Array).isRequired,
  ranking: PropTypes.string.isRequired,
};

export default TopRankDisplay;
