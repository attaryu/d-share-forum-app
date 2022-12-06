import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { asyncAddUser } from '../states/user/action';
import checkEmptyObject from '../utils/checkEmptyObject';

export default function useAuthCheck() {
  const { user } = useSelector((states) => states);
  const [loading, setLoading] = useState(true);
  const [called, setCalled] = useState(false);
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkEmptyObject(user)) setAuth(true);

    if (!called) {
      dispatch(asyncAddUser());
      setCalled(true);
    }

    if (called) {
      setLoading(false);
    }
  }, [user, called, loading]);

  return [auth, loading];
}
