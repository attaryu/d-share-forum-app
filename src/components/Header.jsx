import React from 'react';
import { useHref } from 'react-router-dom';

import Searchbar from './Searchbar';

import getTitle from '../utils/getTitle';

function Header() {
  const href = useHref();
  const title = getTitle(href);

  return (
    <header className="fixed top-0 w-full z-10 bg-primary h-14 flex px-10 items-center">
      <p className="font-outfit font-bold text-white text-2xl">{title}</p>
      {title === 'Home' && (
        <div className="ml-auto">
          <Searchbar />
        </div>
      )}
    </header>
  );
}

export default Header;
