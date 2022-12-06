import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ProfileCard from '../../components/ProfileCard';

import useAuthCheck from '../../hooks/useAuthCheck';
import { removeUserActionCreator } from '../../states/user/action';
import checkEmptyObject from '../../utils/checkEmptyObject';

function Profile() {
  const { user } = useSelector((states) => states);
  const [auth, loading] = useAuthCheck();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!auth) router.push('/');
  }, [auth, loading]);

  function logOutHandler() {
    router.push('/');
    dispatch(removeUserActionCreator());
  }

  if (checkEmptyObject(user)) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <Header location="My Profile" />
      <Navigation />
      <main className="w-4/5 m-auto bg-white shadow-xl pt-14 pb-14 h-screen flex items-center justify-center flex-col">
        <ProfileCard data={user} />
        <button
          type="button"
          className="w-1/5 mt-16 bg-primary py-2.5 flex items-center justify-center rounded-md"
          onClick={logOutHandler}
        >
          <FiLogOut className="text-lg text-white" />
          <span className="pl-3 font-semibold text-white">Log out</span>
        </button>
      </main>
    </>
  );
}

export default Profile;
