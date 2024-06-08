import React, {
  HTMLProps,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSlider } from '../useSlider/index.js';
import { useIntersection } from './useIntersection.js';

export interface ISlide {
  index: number
  ref: React.MutableRefObject<HTMLElement | null>
  isIntersecting: boolean
}

export interface SlideProps extends HTMLProps<HTMLElement> {
  index: number
  htmlElement?: React.ElementType
  children?: React.ReactNode
}

export const Slide: React.FC<SlideProps> = (props) => {
  const {
    index,
    htmlElement = 'div',
    children,
    style,
    onClick: onClickFromProps,
    ...rest
  } = props;

  const [snapStyles, setSnapStyles] = useState<React.CSSProperties | undefined>();
  const slider = useSlider();
  const slideRef = useRef<HTMLElement | null>(null);

  const {
    dispatchSlide,
    sliderTrackRef,
    goToSlideIndex,
    slideWidth,
    slideOnSelect,
    scrollSnap,
    scrollOffset,
    slides
  } = slider;

  const prevIntersection = useRef<boolean | undefined>();

  const { isIntersecting } = useIntersection(slideRef, {
    root: sliderTrackRef,
    rootMargin: scrollOffset ? `0px -${scrollOffset}px 0px -${scrollOffset}px` : '-1px',
  });

  useEffect(() => {
    const intersectionChange = prevIntersection.current !== isIntersecting;

    if (intersectionChange) {
      dispatchSlide({
        index,
        ref: slideRef,
        isIntersecting,
      });

      prevIntersection.current = isIntersecting;
    }
  }, [
    dispatchSlide,
    isIntersecting,
    index,
  ]);

  // here
  useEffect(() => {
    if (scrollSnap) {
      setSnapStyles({
        scrollSnapStop: 'always',
        scrollSnapAlign: 'start',
      })
    } else {
      setSnapStyles(undefined);
    }
  }, [scrollSnap]);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (slideOnSelect) {
      goToSlideIndex(index);
    }

    if (typeof onClickFromProps === 'function') {
      onClickFromProps(e);
    }
  }, [
    slideOnSelect,
    index,
    goToSlideIndex,
    onClickFromProps
  ]);

  const Tag = htmlElement as React.ElementType;

  return (
    <Tag
      {...{
        ref: slideRef,
        onClick: handleClick,
        role: "group",
        'aria-roledescription': "slide",
        'aria-label': `${index + 1} of ${slides?.length || 0}`, // NOTE: do not include the keyword "slide"
        ...rest,
        style: {
          flexShrink: 0,
          width: slideWidth,
          ...style || {},
          ...snapStyles || {},
        },
      }}
    >
      {children && children}
    </Tag>
  );
};
