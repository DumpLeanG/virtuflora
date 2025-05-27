import { useEffect, useRef, type RefObject } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(callback: () => void): RefObject<T> => {
   const ref = useRef<T>(null);

  useEffect(() => {
    
    const handleClickOutside = (event: MouseEvent) => {
      const isIgnored = (event.target as Element)?.closest('.ignore_outside_click') !== null;

      if (ref.current && !ref.current.contains(event.target as Node) && !isIgnored) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);


    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  return ref;
};
