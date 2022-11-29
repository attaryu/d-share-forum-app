import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';

import HeaderThreadCard from '../components/HeaderThreadCard';
import ButtonThreadCard from '../components/ButtonThreadCard';
import CategorySplit from '../components/CategorySplit';
import CreateComment from '../components/CreateComment';
import CommentCard from '../components/CommentCard';
import CommentReminder from '../components/CommentReminder';

import { asyncReceiveThreadDetail, removeDetailThreadActionCreator } from '../states/detailThread/action';
import { asyncReceiveUsers } from '../states/users/action';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

import checkEmptyObject from '../utils/checkEmptyObject';
import categorySpliter from '../utils/categorySpliter';

function Thread() {
  const { threadId } = useParams();
  const {
    user, users, detailThread, leaderboards,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
    dispatch(asyncReceiveLeaderboards());
    dispatch(asyncReceiveUsers());

    return () => dispatch(removeDetailThreadActionCreator());
  }, []);

  if (checkEmptyObject(detailThread)
    || checkEmptyObject(users)
    || checkEmptyObject(leaderboards)) return;

  return (
    <main className="bg-zinc-200 w-4/5 m-auto pt-14 shadow-xl">
      <article className="bg-white p-8">
        <HeaderThreadCard thread={detailThread} />
        <h1 className="font-extrabold text-2xl mt-10 text-zinc-900">{detailThread.title}</h1>

        <div className="mt-6 leading-5 text-zinc-800">
          {parse(detailThread.body)}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categorySpliter(detailThread.category).map((category) => (
            <CategorySplit key={category.id} category={category} />
          ))}
        </div>

        <ButtonThreadCard thread={detailThread} withComment={false} />
      </article>

      <div className="p-8 mt-2">
        {checkEmptyObject(user) ? <CommentReminder /> : <CreateComment />}
      </div>

      <section className="p-8">
        <h1 className="font-semibold text-zinc-600 text-lg">
          {`Comment${detailThread.comments.length > 1 ? `'s (${detailThread.comments.length})` : ''}`}
        </h1>

        <div className="mt-10">
          {detailThread.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Thread;
