import { useRef, useCallback } from 'react';

const useThrottle = (func, delay) => {
  const timeoutRef = useRef(null);
  const lastArgs = useRef(null);
  const lastThis = useRef(null);

  const throttledFunction = useCallback((...args) => {
    lastArgs.current = args;
    lastThis.current = this;

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        func.apply(lastThis.current, lastArgs.current);
        timeoutRef.current = null;
        lastArgs.current = null;
        lastThis.current = null;
      }, delay);
    }
  }, [func, delay]);

  return throttledFunction;
};

export default useThrottle;