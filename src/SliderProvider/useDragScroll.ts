import React, { useEffect, useRef, useState } from 'react';

type Options = {
  buttons?: number[]
  scrollYAxis?: boolean
}

type UseDraggable = (options?: Options) => React.MutableRefObject<HTMLDivElement | null> // eslint-disable-line no-unused-vars

/**
  * Make an element scrollable by dragging
  * @param buttons - Buttons user can drag with. See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
  * @returns {React.MutableRefObject} -  The ref to be applied to to the element to make it draggable
  */
export const useDraggable: UseDraggable = (options) => {
  const {
    buttons = [1, 4, 5],
    scrollYAxis,
  } = options;

  // Ref to be attached to the element we want to drag
  const ref = useRef<HTMLDivElement>(null);
  // Position of the mouse on the page on mousedown
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  // Amount the draggable element is already scrolled
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  useEffect(() => {
    function handleDown(e: MouseEvent) {
      if (ref.current) {
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
    }

    function handleMove(e: MouseEvent) {
      if (ref.current) {
        // Don't fire if other buttons are pressed
        if (!buttons.includes(e.buttons) || !ref.current.contains(e.target as Node)) {
          return;
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
    }

    // Add and clean up listeners
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mousemove', handleMove);

    return () => {
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mousemove', handleMove);
    };
  }, [
    buttons,
    startScrollLeft,
    startScrollTop,
    startX,
    startY,
    scrollYAxis,
  ]);

  return ref;
};

export default useDraggable;
