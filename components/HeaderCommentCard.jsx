import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import getTime from '../utils/getTime';
import pathName from '../utils/pathName';

function HeaderCommentCard({ comment }) {
  const { users, leaderboards } = useSelector((states) => states);
  const owner = users.find((user) => user.id === (comment.ownerId ?? comment.owner.id));

  const ranking = leaderboards.map((ranker) => ranker.user.id).indexOf(owner.id) + 1;
  const time = getTime(comment.createdAt);
  const icons = {
    1: '/asset/1st.avif',
    2: '/asset/2nd.avif',
    3: '/asset/3rd.avif',
  };

  return (
    <div className="flex items-center w-auto">
      <img
        src={comment.owner.avatar}
        alt={`${comment.owner.name} profile`}
        className="w-10 rounded-full"
      />

      <div className="flex items-center pl-4 w-full">
        <Link href={`/${pathName.PROFILE}/${comment.owner.id}`} className="font-bold text-lg leading-4 block">{comment.owner.name}</Link>
        {ranking < 3 && ranking !== 0 && <img src={icons[ranking]} alt={`Ranking ${ranking}`} className="w-5 ml-2" />}
        <time className="text-sm text-end font-medium text-zinc-500 ml-auto w-1/3">
          {time}
        </time>
      </div>
    </div>
  );
}

HeaderCommentCard.propTypes = {
  comment: PropTypes.objectOf(Array).isRequired,
};

export default HeaderCommentCard;
