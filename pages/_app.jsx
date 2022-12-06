import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import store from '../states';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="z-50 sticky top-0">
        <LoadingBar style={{ backgroundColor: '#F9C74F' }} />
      </div>
      <div className="bg-[url('/email-pattern.webp')] h-auto bg-sky-">
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf(Array).isRequired,
};
