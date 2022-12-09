import React from 'react';

import Navigation from '../components/Navigation';
import Wrapper from './utils/ProviderWrapper';
import { addUserActionCreator } from '../states/user/action';

export default {
  title: 'Navigation',
  component: Navigation,
};

const state = addUserActionCreator({
  user: {
    id: 'users-1',
    name: 'M Attar',
    email: 'mattar@gmail.com',
    avatar: 'https://ui-avatars.com/api/?background=fff&color=000&name=M+Attar',
  },
});

function WithAuth() {
  return (
    <Wrapper value={state}>
      <Navigation />
    </Wrapper>
  );
}

function WithoutAuth() {
  return (
    <Wrapper value={addUserActionCreator({ user: {} })}>
      <Navigation />
    </Wrapper>
  );
}

export {
  WithAuth,
  WithoutAuth,
};
