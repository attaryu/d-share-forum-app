import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import RankCard from '../components/RankCard';
import TopRankDisplay from '../components/TopRankDisplay';

import { receiveLeaderboardsActionCreator } from '../states/leaderboards/action';
import { receiveUsersActionCreator } from '../states/users/action';
import { seeAllUsers, seeLeaderboards } from '../utils/api';

function Leaderboards({ leaderboardsISR, usersISR }) {
  const { leaderboards, users } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveLeaderboardsActionCreator({
      leaderboards: leaderboardsISR,
    }));
    dispatch(receiveUsersActionCreator({
      users: usersISR,
    }));
  }, []);

  if (users.length === 0 || leaderboards.length === 0) return null;

  return (
    <>
      <Head>
        <title>Leaderboards</title>
      </Head>
      <Header location="Leaderboards" />
      <Navigation />
      <main className="w-4/5 m-auto pt-10 shadow-xl">
        <section className="grid grid-cols-3 grid-rows-1 py-28 bg-white px-32">
          <div className="mt-5">
            <TopRankDisplay ranker={leaderboards[1]} ranking="2" />
          </div>
          <div>
            <TopRankDisplay ranker={leaderboards[0]} ranking="1" />
          </div>
          <div className="mt-10">
            <TopRankDisplay ranker={leaderboards[2]} ranking="3" />
          </div>
        </section>
        <section className="bg-zinc-200 px-20 pt-5 pb-14">
          {leaderboards.map((ranker, ranking) => ranking > 2 && (
            <RankCard key={ranker.user.id} ranker={ranker} ranking={ranking} />
          ))}
        </section>
      </main>
    </>
  );
}

Leaderboards.propTypes = {
  leaderboardsISR: PropTypes.arrayOf(Object).isRequired,
  usersISR: PropTypes.arrayOf(Object).isRequired,
};

export default Leaderboards;

export async function getStaticProps() {
  const leaderboards = await seeLeaderboards();
  const users = await seeAllUsers();

  return {
    props: {
      leaderboardsISR: leaderboards.data.leaderboards || null,
      usersISR: users.data.users || null,
    },
    revalidate: 30,
  };
}
