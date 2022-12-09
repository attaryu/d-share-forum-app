import React from 'react';

import Navigation from '../components/Navigation';
import Wrapper from './utils/Wrapper';
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
    <Wrapper actions={[state]}>
      <Navigation />
    </Wrapper>
  );
}

function WithoutAuth() {
  return (
    <Wrapper actions={[addUserActionCreator({ user: {} })]}>
      <Navigation />
    </Wrapper>
  );
}

export {
  WithAuth,
  WithoutAuth,
};
