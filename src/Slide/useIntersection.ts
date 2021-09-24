import React, { useEffect, useState } from 'react';

type Options = {
  root?: React.MutableRefObject<HTMLElement>,
  rootMargin?: string,
  threshold?: number
}

const useIntersection = (
  ref: React.MutableRefObject<HTMLElement>,
  options?: Options,
): IntersectionObserverEntry => {
  const {
    root,
    rootMargin,
    threshold,
  } = options;

  const [intersection, setIntersection] = useState({} as IntersectionObserverEntry);

  useEffect(() => {
    let observer;
    const {
      current: currentRef,
    } = ref;

    if (currentRef) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIntersection(entry);
        });
      }, {
        root: root.current,
        rootMargin: rootMargin || '0px',
        threshold: threshold || 0.05,
      });

      observer.observe(currentRef);
    }

    return () => {
      if (observer) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    ref,
    root,
    rootMargin,
    threshold,
  ]);

  return intersection;
};

export default useIntersection;
