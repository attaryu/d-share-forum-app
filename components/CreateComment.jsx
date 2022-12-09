import React, { useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import useSimpleState from '../hooks/useSimpleState';

import { asyncCreateComment } from '../states/detailThread/action';

function CreateComment() {
  const [content, setContent] = useSimpleState('');
  const refFocus = useRef();
  const dispatch = useDispatch();

  function submitComment(event) {
    event.preventDefault();
    dispatch(asyncCreateComment(content));
    setContent('');
  }

  const focusHandler = () => refFocus.current.focus();

  return (
    <form onSubmit={submitComment}>
      <label
        htmlFor="comment"
      >
        <p className="font-semibold mb-3 text-xl" onClick={focusHandler} aria-hidden>Make a comment</p>
        <p className="sr-only">Make a comment</p>
        <textarea
          name="comment"
          className="resize-none w-full h-24 p-3 leading-5 outline-none shadow-xl rounded-lg"
          onChange={setContent}
          value={content}
          ref={refFocus}
          required
        >
          {}
        </textarea>
      </label>
      <button
        type="submit"
        className="flex justify-center items-center bg-primary w-full mt-3 rounded-md py-2 text-white"
      >
        <IoIosSend className="mr-2 text-xl" />
        <span className="font-semibold text-lg">Send</span>
      </button>
    </form>
  );
}

export default CreateComment;
