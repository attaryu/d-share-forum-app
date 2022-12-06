import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import pathName from '../utils/pathName';

function TopRankDisplay({ ranker, ranking }) {
  const { user } = useSelector((states) => states);
  const thisMe = user.id === ranker.user.id ? 'border-4 p-0.5 border-sky-500' : '';
  const rankBadge = {
    1: {
      rankingCheck: '1st',
      iconTopRank: '/asset/1st.avif',
      numberColor: 'text-orange-500',
      scale: 'scale-125',
    },
    2: {
      rankingCheck: '2nd',
      iconTopRank: '/asset/2nd.avif',
      numberColor: 'text-zinc-400',
      scale: 'scale-110',
    },
    3: {
      rankingCheck: '3rd',
      iconTopRank: '/asset/3rd.avif',
      numberColor: 'text-amber-800',
      scale: 'scale-100',
    },
  };

  const attribute = rankBadge[ranking];

  return (
    <div className={`flex flex-col items-center ${attribute.scale}`}>
      <img src={attribute.iconTopRank} alt="" className="w-7" />
      <p className={`${attribute.numberColor} font-bold text-xl mt-1`}>{attribute.rankingCheck}</p>
      <img src={ranker.user.avatar} alt="" className={`rounded-full w-24 mt-2 mb-8 ${thisMe}`} />
      <Link href={`/${pathName.PROFILE}/${ranker.user.id}`} className="font-bold truncate w-5/6 text-center text-xl">{ranker.user.name}</Link>
      <p className="font-semibold">{ranker.score}</p>
    </div>
  );
}

TopRankDisplay.propTypes = {
  ranker: PropTypes.objectOf(Array).isRequired,
  ranking: PropTypes.string.isRequired,
};

export default TopRankDisplay;
