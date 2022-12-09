import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-12';

import store from '../../states';

function Wrapper({ children, value }) {
  store.dispatch(value);

  return (
    <MemoryRouterProvider url="/">
      <Provider store={store}>
        {children}
      </Provider>
    </MemoryRouterProvider>
  );
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.objectOf(Object).isRequired,
};

export default Wrapper;
