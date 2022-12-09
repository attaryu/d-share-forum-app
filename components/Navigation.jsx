import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import {
  MdAddBox,
  MdLeaderboard,
  MdOutlineAddBox,
  MdOutlineLeaderboard,
} from 'react-icons/md';
import { useSelector } from 'react-redux';

import checkEmptyObject from '../utils/checkEmptyObject';

import pathName from '../utils/pathName';

function Navigation() {
  const { user } = useSelector((states) => states);
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className="fixed w-full bottom-0 h-12 bg-primary flex justify-center items-center gap-10">
      <Link
        href={`/${pathName.LEADERBOARDS}`}
        className="text-2xl font-normal text-white"
      >
        { pathname === `/${pathName.LEADERBOARDS}` ? <MdLeaderboard className="text-white" /> : <MdOutlineLeaderboard className="text-white" /> }
      </Link>

      <Link href="/" className="text-2xl font-normal text-white">
        { pathname === '/' ? <AiFillHome className="text-white" /> : <AiOutlineHome className="text-white" /> }
      </Link>

      {!checkEmptyObject(user) && (
        <Link
          href={`/${pathName.THREAD}/create-thread`}
          className="text-2xl font-normal text-white"
        >
          { pathname === `/${pathName.THREAD}/create-thread` ? <MdAddBox className="text-white" /> : <MdOutlineAddBox className="text-white" /> }
        </Link>
      )}

      <Link
        href={`/${checkEmptyObject(user) ? pathName.LOGIN : `${pathName.PROFILE}/me`}`}
        className="text-2xl font-normal text-white"
      >
        {checkEmptyObject(user)
          ? <FiLogIn className="text-white" />
          : (
            <img
              src={user.avatar}
              alt={`${user.name}
              avatar's`}
              className="rounded-full w-7 h-7"
            />
          )}
      </Link>
    </nav>
  );
}

export default Navigation;
