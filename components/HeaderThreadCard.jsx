import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import pathName from '../utils/pathName';

function HeaderThreadCard({ thread }) {
  const { users, leaderboards } = useSelector((states) => states);
  const owner = users.find((user) => user.id === (thread.ownerId ?? thread.owner.id));

  const ranking = leaderboards.map((ranker) => ranker.user.id).indexOf(owner.id) + 1;
  const time = moment(thread.createdAt).startOf('minute').fromNow();
  const afterOneDayCheck = /([0-9]|a) (day|days)/gi.test(time)
    ? moment(thread.createdAt).format('dddd, DD MMM YYYY')
    : time;
  const iconTopRank = {
    1: '/asset/1st.avif',
    2: '/asset/2nd.avif',
    3: '/asset/3rd.avif',
  };

  return (
    <div className="flex items-center">
      <img src={owner.avatar} alt={`${owner.name} profile`} className="rounded-full w-12" />

      <div className="pl-5">
        <div className="flex items-center">
          <Link href={`/${pathName.PROFILE}/${owner.id}`} className="font-bold text-lg">{owner.name}</Link>
          {ranking < 3 && ranking !== 0 && <img src={iconTopRank[ranking]} alt={`Ranking ${ranking}`} className="w-5 ml-1.5" />}
        </div>

        <time className="block font-medium text-sm text-zinc-600">
          {afterOneDayCheck}
        </time>
      </div>
    </div>
  );
}

HeaderThreadCard.propTypes = {
  thread: PropTypes.objectOf(Array).isRequired,
};

export default HeaderThreadCard;
