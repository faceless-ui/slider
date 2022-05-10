import React, { HTMLProps, useRef } from 'react';
import useSlider from '../useSlider';
import SliderButton, { SliderButtonProps } from '../SliderButton';

export interface CounterProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
}

export interface SliderNavProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  prevButtonProps?: SliderButtonProps
  nextButtonProps?: SliderButtonProps
  counter?: CounterProps
  showCounter?: boolean
}

const SliderNav: React.FC<SliderNavProps> = (props) => {
  const {
    htmlElement: Tag = 'div',
    prevButtonProps,
    nextButtonProps,
    showCounter = false,
    counter: {
      htmlElement: CounterTag = 'div',
      id: counterID,
      ...counterRest
    } = {},
    ...rest
  } = props;

  const {
    currentSlideIndex,
    slides,
    setIsPaused,
    pauseOnHover,
  } = useSlider();

  const slideRef = useRef(null);

  return (
    <Tag
      ref={slideRef}
      {...rest}
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
          {...counterRest}
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
