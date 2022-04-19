import React, { useEffect, useState } from 'react';

type Options = {
  root?: React.MutableRefObject<HTMLElement | null>,
  rootMargin?: string,
  threshold?: number
}

const useIntersection = (
  ref: React.MutableRefObject<HTMLElement | null>,
  options?: Options,
): IntersectionObserverEntry => {
  const {
    root,
    rootMargin,
    threshold,
  } = options || {};

  const [intersection, setIntersection] = useState({} as IntersectionObserverEntry);

  useEffect(() => {
    let observer: IntersectionObserver;
    const {
      current: currentRef,
    } = ref;

    if (currentRef) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIntersection(entry);
        });
      }, {
        root: root?.current || null,
        rootMargin: rootMargin || '0px',
        threshold: threshold || 0.05,
      });

      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
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
