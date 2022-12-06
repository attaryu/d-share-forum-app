import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';

import useAuthCheck from '../../hooks/useAuthCheck';
import useSimpleState from '../../hooks/useSimpleState';
import { asyncCreateThread } from '../../states/threads/action';
import checkEmptyObject from '../../utils/checkEmptyObject';

function CreateThread() {
  const { user } = useSelector((states) => states);
  const [title, setTitle] = useSimpleState('');
  const [body, setBody] = useSimpleState('');
  const [category, setCategory] = useSimpleState('');
  const [auth, loading] = useAuthCheck();
  const dispatch = useDispatch();
  const router = useRouter();

  const countCategory = category.length === 0 ? '' : category.split(' ');
  const limitTitle = title.length === 100 ? 'text-red-500' : 'text-zinc-400';
  const limitBody = body.length === 500 ? 'text-red-500' : 'text-zinc-400';
  const limitCategory = countCategory.length === 3 ? 'text-red-500' : 'text-zinc-400';
  const buttonCondition = body.length === 0 || title.length === 0;

  useEffect(() => {
    if (loading) return;
    if (!auth) router.push('/');
  }, [auth, loading]);

  function inputTitleHandler(event) {
    if (event.target.value.length > 100) return;
    setTitle(event);
  }

  function inputBodyHandler(event) {
    if (event.target.value.length > 500) return;
    setBody(event);
  }

  if (checkEmptyObject(user)) {
    return <Loading />;
  }

  function inputCategoryHandler(event) {
    const checkCategory = /[^\sa-zA-Z0-9]/;
    const checkLength = event.target.value.split(' ');

    if (!checkCategory.test(event.target.value) && checkLength.length <= 3) {
      setCategory(event);
    }
  }

  function submitNewThread(event) {
    event.preventDefault();
    dispatch(asyncCreateThread({ title, body, category }));
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Create Thread</title>
      </Head>
      <Header location="Create Thread" />
      <Navigation />
      <main className="w-4/5 pt-20 pb-20 bg-white shadow-xl px-16 m-auto">
        <form onSubmit={submitNewThread}>
          <div className="mb-3 flex items-center">
            <input
              type="text"
              placeholder="Title"
              className="outline-none font-bold text-2xl w-5/6"
              onChange={inputTitleHandler}
              value={title}
              required
            />
            <span className={`text-sm font-medium ml-auto ${limitTitle}`}>
              {`${title.length}/100`}
            </span>
          </div>

          <div className="mb-3 flex relative">
            <textarea
              name="body"
              className="resize-none h-80 outline-none border-2 border-zinc-300 rounded-md pl-3 pr-20  py-1 w-full"
              onChange={inputBodyHandler}
              value={body}
              required
            />
            <span className={`text-sm font-mediu ml-auto absolute top-2 right-3 ${limitBody}`}>
              {`${body.length}/500`}
            </span>
          </div>

          <div className="mb-5 flex items-center">
            <input
              type="text"
              placeholder="Maximum of 3 categories and separated by spaces"
              className="outline-none font-medium text-sky-500 w-full pr-3"
              onChange={inputCategoryHandler}
              value={category}
            />
            <span className={`text-sm font-medium ml-auto ${limitCategory}`}>
              {`${countCategory.length}/3`}
            </span>
          </div>

          <button
            type="submit"
            className="flex justify-center items-center bg-primary w-full mt-3 rounded-md py-1.5 text-white disabled:bg-primary/50 disabled:cursor-not-allowed"
            disabled={buttonCondition}
          >
            <IoIosSend className="mr-2 text-xl" />
            <span className="font-semibold text-lg">Send</span>
          </button>
        </form>
      </main>
    </>
  );
}

export default CreateThread;
