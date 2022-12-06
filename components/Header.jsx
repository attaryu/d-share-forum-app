import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

import Searchbar from './Searchbar';

function Header({ location }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className="fixed top-0 w-full z-10 bg-primary h-14 flex px-10 items-center">
      <p className="font-outfit font-bold text-white text-2xl">{location}</p>
      {pathname === '/' && (
        <div className="ml-auto">
          <Searchbar />
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Header;
