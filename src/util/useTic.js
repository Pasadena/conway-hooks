import { useEffect, useRef } from 'react';

export default function useTic(callback) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    let id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);
}