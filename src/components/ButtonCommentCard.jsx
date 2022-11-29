import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AiOutlineDislike, AiOutlineLike, AiFillDislike, AiFillLike,
} from 'react-icons/ai';

import { asyncUpVoteComment, asyncDownVoteComment, asyncNeutralizeVoteComment } from '../states/detailThread/action';

function ButtonCommentCard({ comment }) {
  const { user } = useSelector((states) => states);
  const dispatch = useDispatch();

  const upVote = () => dispatch(asyncUpVoteComment(comment.id));
  const downVote = () => dispatch(asyncDownVoteComment(comment.id));
  const neutralizeVote = () => dispatch(asyncNeutralizeVoteComment(comment.id));

  return (
    <div className="flex gap-5">
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={comment.upVotesBy.includes(user.id || '') ? neutralizeVote : upVote}
      >
        {comment.upVotesBy.includes(user.id || '') ? <AiFillLike className="text-red-600" /> : <AiOutlineLike />}
        <span>{comment.upVotesBy.length}</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2"
        onClick={comment.downVotesBy.includes(user.id || '') ? neutralizeVote : downVote}
      >
        {comment.downVotesBy.includes(user.id || '') ? <AiFillDislike className="text-red-600" /> : <AiOutlineDislike />}
        <span>{comment.downVotesBy.length}</span>
      </button>
    </div>
  );
}

ButtonCommentCard.propTypes = {
  comment: PropTypes.objectOf(Array).isRequired,
};

export default ButtonCommentCard;
