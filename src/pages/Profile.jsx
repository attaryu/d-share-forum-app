import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';

import { asyncReceiveUsers } from '../states/users/action';
import { removeUserActionCreator } from '../states/user/action';

function Profile() {
  const { user, users } = useSelector((states) => states);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const choiceUser = users.find((otherUser) => otherUser.id === userId) || user;

  useEffect(() => {
    if (!userId) return;
    dispatch(asyncReceiveUsers());
  }, []);

  function logOutHandler() {
    dispatch(removeUserActionCreator());
    navigate('/');
  }

  return (
    <main className="w-4/5 m-auto bg-white shadow-xl pt-14 pb-14 h-screen flex items-center justify-center flex-col">
      <div className="flex items-center">
        <img src={choiceUser.avatar} alt={`${choiceUser.name} avatar`} className="w-28 rounded-full" />
        <div className="pl-10">
          <h1 className="text-5xl font-extrabold text-zinc-900">{choiceUser.name}</h1>
          <p className="text-xl font-medium text-zinc-700 mt-2">{choiceUser.email}</p>
        </div>
      </div>
      {user.id === choiceUser.id && (
        <button
          type="button"
          className="w-1/5 mt-16 bg-primary py-2.5 flex items-center justify-center rounded-md"
          onClick={logOutHandler}
        >
          <FiLogOut className="text-lg text-white" />
          <span className="pl-3 font-semibold text-white">Log out</span>
        </button>
      )}
    </main>
  );
}

export default Profile;
