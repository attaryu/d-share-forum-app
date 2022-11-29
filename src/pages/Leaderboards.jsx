import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RankCard from '../components/RankCard';
import TopRankDisplay from '../components/TopRankDisplay';

import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

import checkEmptyObject from '../utils/checkEmptyObject';

function Leaderboards() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(asyncReceiveLeaderboards()); }, []);

  if (checkEmptyObject(leaderboards)) return;

  return (
    <main className="w-4/5 m-auto pt-14 shadow-xl">
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
  );
}

export default Leaderboards;
