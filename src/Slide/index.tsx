import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import useSlider from '../useSlider';
import { Props } from './types';
import useIntersection from './useIntersection';

const Slide: React.FC<Props> = (props) => {
  const {
    index,
    id,
    className,
    htmlElement = 'div',
    htmlAttributes = {},
    children,
  } = props;

  const slider = useSlider();
  const slideRef = useRef<HTMLElement>(null);

  const {
    dispatchSlide,
    sliderTrackRef,
    goToSlideIndex,
    slideWidth,
    slideOnSelect,
    useScrollSnap,
  } = slider;

  const { isIntersecting } = useIntersection(slideRef, {
    root: sliderTrackRef,
    rootMargin: '-20px',
  });

  useEffect(() => {
    dispatchSlide({
      index,
      ref: slideRef,
      isIntersecting,
    });
  }, [
    index,
    isIntersecting,
    dispatchSlide,
  ]);

  const handleClick = useCallback(() => {
    if (slideOnSelect) {
      goToSlideIndex(index);
    }
  }, [
    slideOnSelect,
    index,
    goToSlideIndex,
  ]);

  const Tag = htmlElement as React.ElementType;

  return (
    <Tag
      {...{
        id,
        className,
        ref: slideRef,
        onClick: handleClick,
        ...htmlAttributes,
        style: {
          flexShrink: 0,
          width: slideWidth,
          scrollSnapAlign: useScrollSnap ? 'start' : undefined,
          scrollSnapStop: 'always',
          ...htmlAttributes.style,
        },
      }}
    >
      {children && children}
    </Tag>
  );
};

export default Slide;
