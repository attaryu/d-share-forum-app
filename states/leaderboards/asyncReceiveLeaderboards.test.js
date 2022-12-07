/*
 Test Flow :
  * Async receive leaderboards
    - failed to receive leaderboards data due to non-API error will warning will be triggered
    - failed to receive leaderboards caused API response will triggered alert
    - success to receive leaderboards will triggered receiveLeaderboardsActionCreator
*/

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveLeaderboardsActionCreator, asyncReceiveLeaderboards } from './action';

const fakeFailedLeaderboardsResponse = {
  'status': 'fail',
  'message': 'there was a problem while requesting',
  'data': {}
};

const fakeSuccessLeaderboardsResponse = {
  'status': 'success',
  'message': 'ok',
  'data': {
    'leaderboards': [
      {
        'user': {
          'id': 'users-1',
          'name': 'John Doe',
          'email': 'john@example.com',
          'avatar': 'https://generated-image-url.jpg',
        },
        'score': 10,
      },
      {
        'user': {
          'id': 'users-2',
          'name': 'Jane Doe',
          'email': 'jane@example.com',
          'avatar': 'https://generated-image-url.jpg',
        },
        'score': 5,
      }
    ],
  }
};

const backupApi = {};

describe('test async receive leaderboards', () => {
  beforeEach(() => {
    backupApi.seeLeaderboards = api.seeLeaderboards;
  });
  
  afterEach(() => {
    api.seeLeaderboards = backupApi.seeLeaderboards;

    delete backupApi.seeLeaderboards;
  });
  
  it('failed to receive leaderboards data due to non-API error and warning will be triggered', async () => {
    // arrage
    api.seeLeaderboards = () => Promise.reject('non-API error');
    const dispatch = jest.fn();
    window.alert = jest.fn();
    
    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith('Leaderboard failed to load');
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('failed to receive leaderboards data caused API response and triggered alert', async () => {
    // arrage
    api.seeLeaderboards = () => Promise.resolve(fakeFailedLeaderboardsResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();
    
    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith(fakeFailedLeaderboardsResponse.message);
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('success to receive leaderboards data and triggered receiveLeaderboardsActionCreator', async () => {
    // arrage
    api.seeLeaderboards = () => Promise.resolve(fakeSuccessLeaderboardsResponse);
    const dispatch = jest.fn();
    
    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(receiveLeaderboardsActionCreator(fakeSuccessLeaderboardsResponse.data));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});