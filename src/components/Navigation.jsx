import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  MdOutlineLeaderboard, MdLeaderboard, MdAddBox, MdOutlineAddBox,
} from 'react-icons/md';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';

import checkEmptyObject from '../utils/checkEmptyObject';

import pathName from '../utils/pathName';

function Navigation() {
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();

  return (
    <nav className="fixed w-full bottom-0 h-12 bg-primary flex justify-center items-center gap-10">
      <Link
        to={`/${pathName.LEADERBOARDS}`}
        className="text-2xl font-normal text-white"
      >
        { pathname === `/${pathName.LEADERBOARDS}` ? <MdLeaderboard /> : <MdOutlineLeaderboard /> }
      </Link>

      <Link to="/" className="text-2xl font-normal text-white">
        { pathname === '/' ? <AiFillHome /> : <AiOutlineHome /> }
      </Link>

      {!checkEmptyObject(user) && (
        <Link
          to={`/${pathName.THREAD}/create-thread`}
          className="text-2xl font-normal text-white"
        >
          { pathname === `/${pathName.THREAD}/create-thread` ? <MdAddBox /> : <MdOutlineAddBox /> }
        </Link>
      )}

      <Link
        to={`/${checkEmptyObject(user) ? pathName.LOGIN : `${pathName.PROFILE}/me`}`}
        className="text-2xl font-normal text-white"
      >
        {checkEmptyObject(user)
          ? <FiLogIn />
          : <img src={user.avatar} alt={`${user.name} avatar's`} className="rounded-full w-7 h-7" />}
      </Link>
    </nav>
  );
}

export default Navigation;
