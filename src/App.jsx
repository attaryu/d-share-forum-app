import React, { useEffect } from 'react';
import {
  Navigate, Route, Routes, useHref,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Leaderboards from './pages/Leaderboards';
import Thread from './pages/Thread';
import CreateThread from './pages/CreateThread';
import Profile from './pages/Profile';

import Header from './components/Header';
import Navigation from './components/Navigation';

import { asyncAddUser } from './states/user/action';

import checkEmptyObject from './utils/checkEmptyObject';
import pathName from './utils/pathName';

function App() {
  const user = useSelector((states) => states.user);
  const dispatch = useDispatch();
  const url = useHref();

  useEffect(() => { dispatch(asyncAddUser()); }, []);

  const checkingURL = url !== '/login' && url !== '/register';

  return (
    <>
      <div className="z-50 sticky top-0">
        <LoadingBar style={{ backgroundColor: '#F9C74F' }} />
      </div>
      <div className="bg-[url('./asset/email-pattern.webp')] h-auto bg-sky-">
        {checkingURL && (
          <>
            <Header />
            <Navigation />
          </>
        )}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`/${pathName.LEADERBOARDS}`} element={<Leaderboards />} />

            <Route path={`/${pathName.THREAD}`}>
              <Route path=":threadId" element={<Thread />} />
              <Route path="create-thread" element={checkEmptyObject(user) ? <Navigate to="/" /> : <CreateThread />} />
            </Route>

            <Route path={`/${pathName.PROFILE}`}>
              <Route path=":userId" element={<Profile />} />
              <Route path="me" element={checkEmptyObject(user) ? <Navigate to="/" /> : <Profile />} />
            </Route>

            {checkEmptyObject(user) && (
              <>
                <Route path={`/${pathName.LOGIN}`} element={<Login />} />
                <Route path={`/${pathName.REGISTER}`} element={<Register />} />
              </>
            )}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
