import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import HeaderCommentCard from './HeaderCommentCard';
import ButtonCommentCard from './ButtonCommentCard';

function CommentCard({ comment }) {
  return (
    <div className="mb-12">
      <HeaderCommentCard comment={comment} />

      <section className="px-5 py-4 rounded-md bg-white mt-4 shadow-md">
        <div className="w-auto font-medium">
          {parse(comment.content)}
        </div>
      </section>

      <div className="mt-5">
        <ButtonCommentCard comment={comment} />
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.objectOf(Array).isRequired,
};

export default CommentCard;
