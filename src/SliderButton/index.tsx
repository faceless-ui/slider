import React, { HTMLProps, MouseEvent, useCallback } from 'react';
import useSlider from '../useSlider';

export interface SliderButtonProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  index?: number
  children?: React.ReactNode
  direction?: 'prev' | 'next'
}

const SliderButton: React.FC<SliderButtonProps> = (props) => {
  const {
    htmlElement: Tag = 'button',
    children,
    direction,
    index,
    onClick,
    ...rest
  } = props;

  const {
    goToPrevSlide,
    goToNextSlide,
    setIsPaused,
    pauseOnHover,
    goToSlideIndex
  } = useSlider();

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (direction === 'prev') {
      goToPrevSlide();
    }

    if (direction === 'next') {
      goToNextSlide();
    }

    if (!direction && index) {
      goToSlideIndex(index);
    }

    if (typeof onClick === 'function') {
      onClick(e);
    }
  }, [
    direction,
    goToPrevSlide,
    goToNextSlide,
    onClick,
    goToSlideIndex,
    index
  ]);

  return (
    <Tag
      type="button"
      aria-label={direction === 'prev' ? 'Go to previous slide' : 'Go to next slide'}
      {...rest}
      onClick={handleClick}
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
      }}
    >
      {children && children}
    </Tag>
  );
};

export default SliderButton;
