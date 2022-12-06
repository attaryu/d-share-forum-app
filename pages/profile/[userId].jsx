import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import ProfileCard from '../../components/ProfileCard';

import { asyncReceiveUsers } from '../../states/users/action';
import checkEmptyObject from '../../utils/checkEmptyObject';

function OtherProfile() {
  const { users } = useSelector((states) => states);
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  const choiceUser = users.find((otherUser) => otherUser.id === userId);

  useEffect(() => {
    dispatch(asyncReceiveUsers());
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Header location="Profile" />
      <Navigation />
      <main className="w-4/5 m-auto bg-white shadow-xl pt-14 pb-14 h-screen flex items-center justify-center flex-col">
        {!checkEmptyObject(users) && <ProfileCard data={choiceUser} />}
      </main>
    </>
  );
}

export default OtherProfile;
