/*
 Test Flow :
  * CreateComment Component test
    - when click "Make a comment" will direct focus to textarea
    - the textarea must have the same value as the input
    - hit submit button and managed to make comment and delete value of textarea
*/

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import store from '../states';
import { receiveDetailThreadActionCreator } from '../states/detailThread/action';
import api from '../utils/api';
import CreateComment from './CreateComment';

function WithProvider() {
  return (
    <Provider store={store}>
      <AddEmptyArray />
    </Provider>
  );
}

function AddEmptyArray() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(receiveDetailThreadActionCreator({
      detailThread: {
        comments: [],
      },
    }));
  }, []);

  return (
    <CreateComment />
  );
}

const fakeCreateCommentResponse = {
  status: 'success',
  message: 'Comment created',
  data: {
    comment: {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    },
  },
};

const backupAPI = {};

describe('CreateComment Component test', () => {
  it('when click "Make a comment" will direct focus to textarea', async () => {
    // arrage
    const { container } = render(<WithProvider />);
    const label = container.querySelector('p.font-semibold.mb-3.text-xl');
    const textarea = container.querySelector('textarea');

    // action
    await userEvent.click(label);

    // assert
    expect(textarea).toHaveFocus();
  });

  it('the textarea must have the same value as the input', async () => {
    // arrage
    const { container } = render(<WithProvider />);
    const textarea = container.querySelector('textarea');

    // action
    await userEvent.type(textarea, 'i typed something');

    // assert
    expect(textarea).toHaveValue('i typed something');
  });

  it('hit submit button and managed to make comment and delete value of textarea', async () => {
    // arrage
    backupAPI.createComment = api.createComment;
    api.createComment = () => Promise.resolve(fakeCreateCommentResponse);
    const { container } = render(<WithProvider />);
    const textarea = container.querySelector('textarea');
    await userEvent.type(textarea, 'i typed something');
    const sendButton = container.querySelector('button[type=submit]');

    // action
    await userEvent.click(sendButton);

    // assert
    expect(textarea).toHaveValue('');

    // clean up
    api.createComment = backupAPI.CreateComment;
    delete backupAPI.CreateComment;
  });
});
