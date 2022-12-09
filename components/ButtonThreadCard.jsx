import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AiOutlineDislike, AiOutlineLike, AiFillDislike, AiFillLike,
} from 'react-icons/ai';
import { BsChatLeftDots } from 'react-icons/bs';

import { asyncNeutralizeVoteThread, asyncUpVoteThread, asyncDownVoteThread } from '../states/shared/action';

import pathName from '../utils/pathName';

function ButtonThreadCard({ thread, withComment }) {
  const { user } = useSelector((states) => states);
  const dispatch = useDispatch();

  const upVote = () => dispatch(asyncUpVoteThread(thread.id));
  const downVote = () => dispatch(asyncDownVoteThread(thread.id));
  const neutralizeVote = () => dispatch(asyncNeutralizeVoteThread(thread.id));

  return (
    <div className="flex item-center justify-around mt-5 border-t-4 border-t-zinc-300 pt-5">
      <button
        type="button"
        name={thread.downVotesBy.includes(user.id || '') ? 'neutralizeVote' : 'upVote'}
        className="flex items-center gap-3 text-xl"
        onClick={thread.upVotesBy.includes(user.id || '') ? neutralizeVote : upVote}
      >
        {thread.upVotesBy.includes(user.id || '') ? <AiFillLike className="text-red-600" /> : <AiOutlineLike />}
        <span className="font-medium text-base">{thread.upVotesBy.length}</span>
      </button>

      <button
        type="button"
        name={thread.downVotesBy.includes(user.id || '') ? 'neutralizeVote' : 'downVote'}
        className="flex items-center gap-3 text-xl"
        onClick={thread.downVotesBy.includes(user.id || '') ? neutralizeVote : downVote}
      >
        {thread.downVotesBy.includes(user.id || '') ? <AiFillDislike className="text-red-600" /> : <AiOutlineDislike />}
        <span className="font-medium text-base">{thread.downVotesBy.length}</span>
      </button>

      {withComment && (
        <Link href={`/${pathName.THREAD}/${thread.id}`}>
          <span className="flex items-center gap-3 text-xl">
            <BsChatLeftDots />
            <span className="font-medium text-base">{thread.totalComments}</span>
          </span>
        </Link>
      )}
    </div>
  );
}

ButtonThreadCard.propTypes = {
  thread: PropTypes.objectOf(Array).isRequired,
  withComment: PropTypes.bool.isRequired,
};

export default ButtonThreadCard;
