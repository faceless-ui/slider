import React, { useCallback, useEffect, useState } from 'react';
import useSlider from '../useSlider';
import { Props } from './types';

const SliderButton: React.FC<Props> = (props) => {
  const {
    id,
    className,
    htmlElement = 'button',
    htmlAttributes = {},
    children,
    direction,
  } = props;

  const slider = useSlider();

  const {
    goToPrevSlide,
    goToNextSlide,
    // intersectingSlideIndex,
    // scrollRatio,
    // slides,
  } = slider;

  // const [isDisabled, setIsDisabled] = useState();

  // useEffect(() => {
  //   let newIsDisabled;

  //   if (direction === 'prev') {
  //     const hasPrevSlide = currentSlideIndex - 1 >= 0 || scrollRatio > 0;
  //     newIsDisabled = !hasPrevSlide || scrollRatio <= 0;
  //   }

  //   if (direction === 'next') {
  //     const hasNextSlide = currentSlideIndex + 1 < slides.length;
  //     newIsDisabled = !hasNextSlide || scrollRatio >= 1;
  //   }

  //   // setIsDisabled(newIsDisabled);
  // }, [
  //   slides.length,
  //   currentSlideIndex,
  //   direction,
  //   scrollRatio,
  // ]);

  const handleClick = useCallback(() => {
    if (direction === 'prev') {
      goToPrevSlide();
    }
    if (direction === 'next') {
      goToNextSlide();
    }
  }, [
    direction,
    goToPrevSlide,
    goToNextSlide,
  ]);

  const Tag = htmlElement as React.ElementType;

  return (
    <Tag
      onClick={handleClick}
      type="button"
      // disabled={isDisabled}
      id={id}
      className={className}
      {...htmlAttributes}
    >
      {children && children}
    </Tag>
  );
};

export default SliderButton;
