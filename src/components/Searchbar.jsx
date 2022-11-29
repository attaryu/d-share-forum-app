import React, { useEffect, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

import useSimpleState from '../hooks/useSimpleState';
import useSearchURL from '../hooks/useSearchURL';

function Searchbar() {
  const searchInput = useRef();
  const [keyword, setKeyword] = useSimpleState('');
  const [url, setUrl] = useSearchURL('tag');

  useEffect(() => {
    if (url === null || url.length === 0) return;

    searchInput.current.focus();
    setKeyword(url);
  }, []);

  function inputKeywordHandler(event) {
    setKeyword(event);
    setUrl(event);
  }

  function expandSearchBar() {
    searchInput.current.focus();
    searchInput.current.classList.remove('w-0');
    searchInput.current.classList.add('w-full');
    searchInput.current.classList.add('px-3');
  }

  function shrinkSearchBar() {
    if (keyword.length !== 0) return;
    searchInput.current.classList.add('w-0');
    searchInput.current.classList.remove('w-full');
    searchInput.current.classList.remove('px-3');
  }

  return (
    <div className="w-80 h-8 flex flex-row-reverse items-center">
      <input
        type="text"
        className="w-0 h-full py-1 transition-all duration-500 font-medium text-sm outline-none"
        placeholder="Search by category..."
        onChange={inputKeywordHandler}
        value={keyword}
        ref={searchInput}
        onFocus={expandSearchBar}
        onBlur={shrinkSearchBar}
      />
      <button
        type="button"
        className="text-xl h-full bg-white font-semibold px-2 block transition-all duration-500"
        onClick={expandSearchBar}
      >
        <BiSearch />
      </button>
    </div>
  );
}

export default Searchbar;
