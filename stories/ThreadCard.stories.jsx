import React from 'react';

import ThreadCard from '../components/ThreadCard';
import Wrapper from './utils/Wrapper';
import { addUserActionCreator } from '../states/user/action';
import { receiveUsersActionCreator } from '../states/users/action';
import { receiveLeaderboardsActionCreator } from '../states/leaderboards/action';

export default {
  title: 'Thread Card',
  component: ThreadCard,
};

const actions = [
  addUserActionCreator({
    user: {
      id: 'users-1',
      name: 'M Attar',
      email: 'mattar@gmail.com',
      avatar: 'https://ui-avatars.com/api/?background=000&color=fff&name=M+Attar',
    },
  }),
  receiveUsersActionCreator({
    users: [
      {
        id: 'users-1',
        name: 'M Attar',
        avatar: 'https://ui-avatars.com/api/?background=000&color=fff&name=M+Attar',
      },
    ],
  }),
  receiveLeaderboardsActionCreator({
    leaderboards: [
      {
        user: {
          id: 'users-1',
          name: 'M Attar',
        },
        score: 10,
      },
    ],
  }),
];

function Template(args) {
  const thread = {
    id: 'thread-1',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: ['users-2', 'users-3', 'users-1', 'users-12'],
    downVotesBy: ['users-7'],
    totalComments: 12,
    ...args,
  };

  return (
    <Wrapper actions={actions}>
      <ThreadCard thread={thread} />
    </Wrapper>
  );
}

const Origin = Template.bind();

Origin.args = {
  title: 'Judul Thread',
  body: 'Ini adalah thread pertama',
  category: 'threadcard',
};

export {
  Origin,
};
