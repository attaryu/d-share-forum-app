import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonThreadCard from '../../components/ButtonThreadCard';
import CategorySplit from '../../components/CategorySplit';
import CommentCard from '../../components/CommentCard';
import CommentReminder from '../../components/CommentReminder';
import CreateComment from '../../components/CreateComment';
import Header from '../../components/Header';
import HeaderThreadCard from '../../components/HeaderThreadCard';
import Navigation from '../../components/Navigation';

import { asyncReceiveDetailThread, removeDetailThreadActionCreator } from '../../states/detailThread/action';
import { asyncReceiveLeaderboards } from '../../states/leaderboards/action';
import { asyncReceiveUsers } from '../../states/users/action';
import categorySpliter from '../../utils/categorySpliter';
import checkEmptyObject from '../../utils/checkEmptyObject';

function Thread() {
  const router = useRouter();
  const { threadId } = router.query;
  const {
    user, users, detailThread, leaderboards,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    if (threadId) {
      dispatch(asyncReceiveDetailThread(threadId));
      dispatch(asyncReceiveLeaderboards());
      dispatch(asyncReceiveUsers());
    }

    return () => dispatch(removeDetailThreadActionCreator());
  }, [threadId]);

  if (checkEmptyObject(detailThread)
    || checkEmptyObject(users)
    || checkEmptyObject(leaderboards)) return;

  return (
    <>
      <Head>
        <title>Detail Thread</title>
      </Head>
      <Header location="Detail" />
      <Navigation />
      <main className="bg-zinc-200 w-4/5 m-auto pt-14 shadow-xl">
        <article className="bg-white p-8">
          <HeaderThreadCard thread={detailThread} />
          <h1 className="font-extrabold text-2xl mt-10 text-zinc-900">{detailThread.title}</h1>

          <div className="mt-6 leading-5 text-zinc-800">
            {detailThread.body}
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
    </>
  );
}

export default Thread;
