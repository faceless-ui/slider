import React, { useRef } from 'react';
import useSlider from '../useSlider';
import SliderButton from '../SliderButton';
import { Props } from './types';

const SliderNav: React.FC<Props> = (props) => {
  const {
    id,
    className,
    htmlElement = 'div',
    htmlAttributes = {},
    prevButtonProps,
    nextButtonProps,
    showCounter = false,
    counter: {
      htmlElement: counterHTMLElement = 'div',
      htmlAttributes: counterHTMLAttributes,
      id: counterID,
      className: counterClassName,
    } = {},
  } = props;

  const slider = useSlider();
  const slideRef = useRef(null);

  const {
    currentSlideIndex,
    slides,
  } = slider;

  const Tag = htmlElement as React.ElementType;
  const CounterTag = counterHTMLElement as React.ElementType;

  return (
    <Tag
      id={id}
      className={className}
      ref={slideRef}
      {...htmlAttributes}
    >
      <SliderButton
        direction="prev"
        {...prevButtonProps}
      />
      {showCounter && (
        <CounterTag
          id={counterID}
          className={counterClassName}
          {...counterHTMLAttributes}
        >
          {`${currentSlideIndex + 1} / ${slides.length}`}
        </CounterTag>
      )}
      <SliderButton
        direction="next"
        {...nextButtonProps}
      />
    </Tag>
  );
};

export default SliderNav;
