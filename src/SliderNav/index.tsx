import React, { useRef } from 'react';
import useSlider from '../useSlider';
import SliderButton, { Props as SliderButtonProps } from '../SliderButton';

export type Props = {
  id?: string,
  className?: string,
  htmlElement?: React.ElementType,
  htmlAttributes?: {
    [key: string]: unknown
  },
  prevButtonProps?: SliderButtonProps,
  nextButtonProps?: SliderButtonProps,
  counter?: {
    Component?: React.ReactNode
    id?: string,
    className?: string,
    htmlElement?: React.ElementType,
    htmlAttributes?: {
      [key: string]: unknown
    },
  },
  showCounter?: boolean
}

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

  const {
    currentSlideIndex,
    slides,
    setIsPaused,
    pauseOnHover,
  } = useSlider();

  const slideRef = useRef(null);

  const Tag = htmlElement as React.ElementType;
  const CounterTag = counterHTMLElement as React.ElementType;

  return (
    <Tag
      id={id}
      className={className}
      ref={slideRef}
      {...htmlAttributes}
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
      }}
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
