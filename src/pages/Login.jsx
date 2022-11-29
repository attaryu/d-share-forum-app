import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogIn } from 'react-icons/fi';

import InputWithIcon from '../components/InputWithIcon';

import useSimpleState from '../hooks/useSimpleState';

import { asyncLoginUser } from '../states/shared/action';

import pathName from '../utils/pathName';
import checkEmptyObject from '../utils/checkEmptyObject';

import Logo from '../asset/d\'share.avif';
import EmailIcon from '../asset/email.avif';
import PasswordIcon from '../asset/password.avif';

function Login() {
  const { user } = useSelector((states) => states);
  const [email, setEmail] = useSimpleState('');
  const [password, setPassword] = useSimpleState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function submitLogin(event) {
    event.preventDefault();
    dispatch(asyncLoginUser({ email, password }));

    if (checkEmptyObject(user)) return;

    navigate('/');
  }

  return (
    <main className="w-4/5 bg-white px-72 h-screen m-auto shadow-xl flex justify-center flex-col">
      <section className="flex justify-center items-center">
        <img src={Logo} alt="D'share logo" className="h-16" />
        <div className="pl-7">
          <h1 className="font-extrabold text-4xl">D&#39;share</h1>
          <p className="font-semibold -mt-1 text-zinc-600">Discussion and share</p>
        </div>
      </section>

      <form className="flex flex-col items-center mt-24 px-5" onSubmit={submitLogin}>
        <InputWithIcon
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          formHandler={setEmail}
          icon={EmailIcon}
        />

        <InputWithIcon
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          formHandler={setPassword}
          icon={PasswordIcon}
        />

        <button
          type="submit"
          className="mt-16 py-2 w-full bg-primary font-semibold text-white rounded-md flex items-center justify-center"
        >
          <FiLogIn className="text-lg" />
          <span className="pl-4">Log in</span>
        </button>

        <p className="font-medium text-sm mt-3 text-zinc-600">
          Don&#39;t have an account yet?
          <Link to={`/${pathName.REGISTER}`} className="text-cyan-600"> sign up </Link>
          now!
        </p>

        <p className="font-medium text-sm text-zinc-500 mt-1">
          or back to
          <Link to="/" className="text-cyan-600"> home</Link>
          .
        </p>
      </form>
    </main>
  );
}

export default Login;
