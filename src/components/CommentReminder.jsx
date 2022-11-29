import React from 'react';
import { Link } from 'react-router-dom';

function CommentReminder() {
  return (
    <div>
      <p className="text-zinc-500">
        Please
        <Link to="/login" className="text-cyan-600"> login </Link>
        or
        <Link to="/register" className="text-cyan-600"> register </Link>
        before making a comment
      </p>
    </div>
  );
}

export default CommentReminder;
