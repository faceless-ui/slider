import React, { HTMLProps, MouseEvent, useCallback } from 'react';
import useSlider from '../useSlider';

export interface SliderButtonProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  children?: React.ReactNode
  direction?: 'prev' | 'next'
}

const SliderButton: React.FC<SliderButtonProps> = (props) => {
  const {
    htmlElement: Tag = 'button',
    children,
    direction,
    onClick,
    ...rest
  } = props;

  const {
    goToPrevSlide,
    goToNextSlide,
    setIsPaused,
    pauseOnHover,
  } = useSlider();

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (direction === 'prev') {
      goToPrevSlide();
    }
    if (direction === 'next') {
      goToNextSlide();
    }

    if (typeof onClick === 'function') {
      onClick(e);
    }
  }, [
    direction,
    goToPrevSlide,
    goToNextSlide,
    onClick
  ]);

  return (
    <Tag
      type="button"
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
