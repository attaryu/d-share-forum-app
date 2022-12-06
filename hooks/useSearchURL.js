import { useRouter } from 'next/router';

function useSearchURL(key) {
  const router = useRouter();

  function setKeyword(newKeyword) {
    if (typeof newKeyword === 'string') {
      router.push({
        query: { [key]: newKeyword },
      });
    } else {
      router.push({
        query: { [key]: newKeyword.target.value },
      });
    }
  }

  return [router.query[key], setKeyword];
}

export default useSearchURL;
