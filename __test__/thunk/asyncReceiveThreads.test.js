/*
 Test Flow :
  * Async receive threads
    - failed to receive data due to non-API error will warning will be triggered
    - successfully receiving thread data, leaderboard data, and user data will trigger
      receiveThreadsActionCreator, receiveUsersActionCreator, addCategoryActionCreator, and
      receiveLeaderboardsActionCreator
*/

import { ApiError } from 'next/dist/server/api-utils';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { addCategoryActionCreator } from '../../states/category/action';
import { receiveLeaderboardsActionCreator } from '../../states/leaderboards/action';
import { receiveThreadsActionCreator } from '../../states/threads/action';
import { receiveUsersActionCreator } from '../../states/users/action';
import { asyncReceiveThreads } from '../../states/shared/action';

const fakeUsersResponse = {
  status: 'success',
  message: 'ok',
  data: {
    users: [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ],
  },
};

const fakeThreadsResponse = {
  status: 'success',
  message: 'ok',
  data: {
    threads: [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ],
  },
};

const fakeLeaderboardsResponse = {
  status: 'success',
  message: 'ok',
  data: {
    leaderboards: [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 5,
      },
    ],
  },
};

const backupApi = {};

describe('test async receive threads', () => {
  beforeEach(() => {
    backupApi.seeAllThreads = api.seeAllThreads;
    backupApi.seeAllUsers = api.seeAllUsers;
    backupApi.seeLeaderboards = api.seeLeaderboards;
  });

  afterEach(() => {
    api.seeAllThreads = backupApi.seeAllThreads;
    api.seeAllUsers = backupApi.seeAllUsers;
    api.seeLeaderboards = backupApi.seeLeaderboards;

    delete backupApi.seeAllThreads;
    delete backupApi.seeAllUsers;
    delete backupApi.seeLeaderboards;
  });

  it('failed to receive data due to non-API error will warning will be triggered', async () => {
    // arrage
    api.seeAllThreads = () => Promise.reject(new ApiError('non-API error'));
    api.seeAllUsers = () => Promise.reject(new ApiError('non-API error'));
    api.seeLeaderboards = () => Promise.reject(new ApiError('non-API error'));
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith('Threads failed to load');
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('successfully receiving thread data, leaderboard data, and user data will trigger receiveThreadsActionCreator, receiveUsersActionCreator, and receiveLeaderboardsActionCreator', async () => {
    // arrage
    api.seeAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.seeAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.seeLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = jest.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(receiveThreadsActionCreator(fakeThreadsResponse.data));
    expect(dispatch).toBeCalledWith(addCategoryActionCreator(fakeThreadsResponse.data));
    expect(dispatch).toBeCalledWith(receiveUsersActionCreator(fakeUsersResponse.data));
    expect(dispatch)
      .toBeCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse.data));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
