import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InputWithIcon from '../components/InputWithIcon';
import Loading from '../components/Loading';

import useAuthCheck from '../hooks/useAuthCheck';
import useSimpleState from '../hooks/useSimpleState';
import { asyncRegisterUser } from '../states/registerUser/action';
import checkEmptyObject from '../utils/checkEmptyObject';
import pathName from '../utils/pathName';

function Register() {
  const { registerUser } = useSelector((states) => states);
  const [auth] = useAuthCheck();
  const [name, setName] = useSimpleState('');
  const [email, setEmail] = useSimpleState('');
  const [password, setPassword] = useSimpleState('');
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (auth) router.push('/');
    if (!checkEmptyObject(registerUser)) router.push('/login');
  }, [registerUser, auth]);

  function registerHandler(event) {
    event.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }));
  }

  if (auth) {
    return <Loading />;
  }

  return (
    <main className="w-4/5 bg-white px-72 h-screen m-auto shadow-xl flex justify-center flex-col">
      <section>
        <h1 className="font-extrabold text-primary text-3xl text-center">Create your account</h1>
        <p className="font-medium text-sm text-center px-3 mt-2 text-zinc-600">
          Don&#39;t be too serious, because the data will be deleted periodically
        </p>
      </section>

      <form className="flex flex-col items-center mt-10 px-5" onSubmit={registerHandler}>
        <InputWithIcon
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          formHandler={setName}
          maxLength="32"
          icon="/asset/name.avif"
        />

        <InputWithIcon
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          formHandler={setEmail}
          icon="/asset/email.avif"
        />

        <InputWithIcon
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          formHandler={setPassword}
          icon="/asset/password.avif"
          minLength="6"
        />

        <button
          type="submit"
          className="w-full bg-primary py-2 rounded-md font-semibold text-white mt-14"
        >
          Sign in
        </button>

        <p className="font-medium text-sm mt-3 text-zinc-600">
          Already have an account?
          <Link href={`/${pathName.LOGIN}`} className="text-cyan-600"> log in </Link>
        </p>

        <p className="font-medium text-sm text-zinc-500 mt-1">
          or back to
          <Link href="/" className="text-cyan-600"> home</Link>
          .
        </p>
      </form>
    </main>
  );
}

export default Register;
