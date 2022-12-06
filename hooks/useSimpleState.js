import { useState } from 'react';

function useSimpleState(initialValue) {
  const [state, setStateOrigin] = useState(initialValue);

  function setState(value) {
    if (value?.target?.nodeName === 'DIV') {
      setStateOrigin(value.target.innerHTML);
    } else if (typeof value === 'string' || typeof value === 'boolean') {
      setStateOrigin(value);
    } else {
      setStateOrigin(value.target.value);
    }
  }

  return [state, setState];
}

export default useSimpleState;
