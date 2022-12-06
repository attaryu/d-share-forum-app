import React from 'react';
import Link from 'next/link';

function CommentReminder() {
  return (
    <div>
      <p className="text-zinc-500">
        Please
        <Link href="/login" className="text-cyan-600"> login </Link>
        or
        <Link href="/register" className="text-cyan-600"> register </Link>
        before making a comment
      </p>
    </div>
  );
}

export default CommentReminder;
