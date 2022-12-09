/*
 Test Flow :
  * Async receive detail thread
    - failed to receive detail thread data due to non-API error will warning will be triggered
    - failed to receive detail thread caused API response will triggered alert
    - success to receive detail thread will triggered receiveDetailThreadActionCreator
*/

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveDetailThreadActionCreator, asyncReceiveDetailThread } from '../../states/detailThread/action';

const fakeFailedDetailThreadResponse = {
  status: 'fail',
  message: 'there was a problem while requesting',
  data: {},
};

const fakeSuccessDetailThreadResponse = {
  status: 'success',
  message: 'ok',
  data: {
    detailThread: {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    },
  },
};

const backupApi = {};

describe('test async receive detail thread', () => {
  beforeEach(() => {
    backupApi.seeDetailThread = api.seeDetailThread;
  });

  afterEach(() => {
    api.seeDetailThread = backupApi.seeDetailThread;

    delete backupApi.seeDetailThread;
  });

  it('failed to receive detail thread due to non-API error and warning will be triggered', async () => {
    // arrage
    api.seeDetailThread = () => Promise.reject(new Error('non-API error'));
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncReceiveDetailThread()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith('Thread details failed to load');
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('failed to receive detail thread caused API response and triggered alert', async () => {
    // arrage
    api.seeDetailThread = () => Promise.resolve(fakeFailedDetailThreadResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncReceiveDetailThread()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith(fakeFailedDetailThreadResponse.message);
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('success to receive detail thread will triggered receiveDetailThreadActionCreator', async () => {
    // arrage
    api.seeDetailThread = () => Promise.resolve(fakeSuccessDetailThreadResponse);
    const dispatch = jest.fn();

    // action
    await asyncReceiveDetailThread()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch)
      .toBeCalledWith(receiveDetailThreadActionCreator(fakeSuccessDetailThreadResponse.data));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
