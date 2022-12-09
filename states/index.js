import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import userReducer from './user/reducer';
import registerUserReducer from './registerUser/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import categoryReducer from './category/reduce';
import detailThreadReducer from './detailThread/reducer';
import leaderboardsReducer from './leaderboards/reducer';

import checkAuthentication from './middlewares';

const store = configureStore({
  reducer: {
    user: userReducer,
    registerUser: registerUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    categorys: categoryReducer,
    detailThread: detailThreadReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }).concat(checkAuthentication),
});

export default store;
