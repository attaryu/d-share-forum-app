import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ThreadCard from '../components/ThreadCard';

import useSearchURL from '../hooks/useSearchURL';
import { asyncReceiveThreads } from '../states/shared/action';
import checkEmptyObject from '../utils/checkEmptyObject';

export default function Home() {
  const {
    users,
    threads,
    categorys,
    leaderboards,
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [category] = useSearchURL('category');

  const filteredThreads = category
    ? threads.filter((thread) => thread.category.includes(category))
    : threads;

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, []);

  if (checkEmptyObject(users)
    || checkEmptyObject(threads)
    || checkEmptyObject(leaderboards)) return;

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header location="Home" />
      <Navigation />
      <div className="w-4/5 m-auto shadow-xl mt-14 mb-12 bg-zinc-100">
        <main>
          <section className="pt-4 px-16">
            <h1 className="font-medium text-lg text-zinc-400">Popular category</h1>

            <div className="w-full flex items-center gap-7 mt-3.5 pb-5 overflow-x-auto">
              {categorys.map((categoryObj, i) => i < 6 && (
                <CategoryCard key={categoryObj.id} category={categoryObj} />
              ))}
            </div>
          </section>

          <div className="px-16 mt-8">
            {filteredThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </main>

        <footer className="pt-10 px-4 pb-8">
          <p className="text-center font-medium text-zinc-400">
            There are no more threads, let&#39;s start with yours
          </p>
        </footer>
      </div>
    </>
  );
}
