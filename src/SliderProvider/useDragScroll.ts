import React, { useEffect, useState } from 'react';

type Options = {
  buttons?: number[]
  scrollYAxis?: boolean
  enable?: boolean
  ref: React.MutableRefObject<HTMLDivElement | null>
}

type UseDraggable = (options?: Options) => null // eslint-disable-line no-unused-vars

/**
  * Make an element scrollable by dragging
  * @param buttons - Buttons user can drag with. See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
  * @returns {React.MutableRefObject} -  The ref to be applied to to the element to make it draggable
  */
export const useDraggable: UseDraggable = (options) => {
  const {
    buttons = [1, 4, 5],
    scrollYAxis,
    enable,
    ref
  } = options || {};

  // Position of the mouse on the page on mousedown
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  // Amount the draggable element is already scrolled
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (ref?.current && enable) {
        // Only allow dragging inside of target element
        if (!ref.current.contains(e.target as Node)) {
          return;
        }

        // Set initial positions of mouse element scroll
        setStartX(e.pageX - ref.current.offsetLeft);
        setStartY(e.pageY - ref.current.offsetTop);
        setStartScrollLeft(ref.current.scrollLeft);
        setStartScrollTop(ref.current.scrollTop);
      }
    };

    const handleMove = (e: MouseEvent) => {
      if (ref?.current && enable) {
        // Don't fire if other buttons are pressed
        if (!buttons.includes(e.buttons) || !ref.current.contains(e.target as Node)) {
          return;
        }

        if (ref.current.children) {
          // disable nested anchor links from navigating while dragging
          const childrenAsArray = Array.from(ref.current.children);
          childrenAsArray.forEach((child) => {
            const childAsElement = child as HTMLElement;
            childAsElement.style.pointerEvents = 'none';
          });
        }

        e.preventDefault();
        // Position of mouse on the page
        const mouseX = e.pageX - ref.current.offsetLeft;
        const mouseY = e.pageY - ref.current.offsetTop;
        // Distance of the mouse from the origin of the last mousedown event
        const walkX = mouseX - startX;
        const walkY = mouseY - startY;
        // Set element scroll
        ref.current.scrollLeft = startScrollLeft - walkX;
        const newScrollTop = startScrollTop - walkY;
        if (scrollYAxis !== false) {
          ref.current.scrollTop = newScrollTop;
        }
      }
    };

    const handleUp = () => {
      // reenable nested anchor links after dragging
      if (ref?.current?.children && enable) {
        const childrenAsArray = Array.from(ref.current.children);
        childrenAsArray.forEach((child) => {
          const childAsElement = child as HTMLElement;
          childAsElement.style.removeProperty('pointer-events');
        });
      }
    };

    // Add and clean up listeners
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);

    return () => {
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [
    buttons,
    startScrollLeft,
    startScrollTop,
    startX,
    startY,
    scrollYAxis,
    enable,
    ref
  ]);

  return null;
};

export default useDraggable;
