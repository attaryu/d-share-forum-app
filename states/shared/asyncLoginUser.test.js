/*
 Test Flow :
  * Async login user
    - failed to receive user data due to non-API error will warning will be triggered
    - failed to receive user data caused API response will triggered alert
    - success to receive user data will triggered addUserActionCreator
*/

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { addUserActionCreator } from '../user/action';
import { asyncLoginUser } from './action';

const fakeSuccessfulLoginResponse = {
  'status': 'success',
  'message': 'ok',
  'data': {
      'token': 'Y78TybuG5rfTFgtu5r5YECrfUG5HR6t7',
  }
};

const fakeFailedLoginResponse = {
  'status': 'fail',
  'message': 'there was a problem while requesting',
  'data': {}
};

const fakeSuccessGetUserResponse = {
  'status': 'success',
  'message': 'ok',
  'data': {
      'user': {
          'id': 'john_doe',
          'name': 'John Doe',
          'email': 'john@example.com',
          'avatar': 'https://generated-image-url.jpg'
      }
  }
};

const backupApi = {};

describe('test async login user', () => {
  beforeEach(() => {
    backupApi.login = api.login;
    backupApi.seeOwnProfile = api.seeOwnProfile;
  });
  
  afterEach(() => {
    api.login = backupApi.login;
    api.seeOwnProfile = backupApi.seeOwnProfile;

    delete backupApi.login;
    delete backupApi.seeOwnProfile;
  });
  
  it('failed to receive user data due to non-API error and warning will be triggered', async () => {
    // arrage
    api.login = () => Promise.reject('non-API error');
    const dispatch = jest.fn();
    window.alert = jest.fn();
    
    // action
    await asyncLoginUser({
      email: 'someOne@gmail.com',
      password: 'thedifficultpassword',
    })(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith('Login failed');
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('failed to receive user data caused API response and triggered alert', async () => {
    // arrage
    api.login = () => Promise.resolve(fakeFailedLoginResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();
    
    // action
    await asyncLoginUser({
      email: 'someOne@gmail.com',
      password: 'thedifficultpassword',
    })(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(window.alert).toBeCalledWith(fakeFailedLoginResponse.message);
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('success to receive user data and triggered addUserActionCreator', async () => {
    // arrage
    api.login = () => Promise.resolve(fakeSuccessfulLoginResponse);
    api.seeOwnProfile = () => Promise.resolve(fakeSuccessGetUserResponse);
    const dispatch = jest.fn();
    
    // action
    await asyncLoginUser({
      email: 'someOne@gmail.com',
      password: 'thedifficultpassword',
    })(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(addUserActionCreator(fakeSuccessGetUserResponse.data));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
