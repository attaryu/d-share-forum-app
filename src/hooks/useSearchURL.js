import { useSearchParams } from 'react-router-dom';

function useSearchURL(key) {
  const [keyword, setKeywordOrigin] = useSearchParams();

  function setKeyword(newKeyword) {
    if (typeof newKeyword === 'string' || newKeyword === null) setKeywordOrigin({ [key]: newKeyword });
    else setKeywordOrigin({ [key]: newKeyword.target.value });
  }

  return [keyword.get(key), setKeyword];
}

export default useSearchURL;
