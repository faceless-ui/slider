import React, { useRef } from 'react';
import useSlider from '../useSlider';
import { Props } from './types';

const SliderNav: React.FC<Props> = (props) => {
  const {
    id,
    className,
    htmlElement = 'div',
    htmlAttributes = {},
    Prev,
    Next,
    showCounter = true,
  } = props;

  const slider = useSlider();
  const slideRef = useRef(null);

  const {
    prevSlide,
    nextSlide,
    currentSlideIndex,
    scrollRatio,
    slides,
  } = slider;

  const hasNext = currentSlideIndex + 1 < slides.length;
  const hasPrev = currentSlideIndex - 1 >= 0 || scrollRatio > 0;

  const disablePrev = !hasPrev || scrollRatio <= 0;
  const disableNext = !hasNext || scrollRatio >= 1;

  const Tag = htmlElement as React.ElementType;

  return (
    <Tag
      id={id}
      className={className}
      ref={slideRef}
      {...htmlAttributes}
    >
      <button
        onClick={prevSlide}
        type="button"
        disabled={disablePrev}
      >
        {Prev}
      </button>
      {showCounter && (
        <div>
          <b>
            {`${currentSlideIndex + 1} / ${slides.length}`}
          </b>
        </div>
      )}
      <button
        onClick={nextSlide}
        type="button"
        disabled={disableNext}
      >
        {Next}
      </button>
    </Tag>
  );
};

export default SliderNav;
