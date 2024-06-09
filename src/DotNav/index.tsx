import React, { HTMLProps } from 'react';
import { useSlider } from '../useSlider/index.js';

export interface DotNavProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  dotClassName?: string
  activeDotClassName?: string
  buttonProps?: HTMLProps<HTMLButtonElement>
}

export const DotNav: React.FC<DotNavProps> = (props) => {
  const {
    htmlElement: Tag = 'div',
    dotClassName,
    activeDotClassName,
    buttonProps = {},
    ...rest
  } = props;

  const {
    currentSlideIndex,
    slides,
    setIsPaused,
    pauseOnHover,
    goToSlideIndex,
    id: idFromContext
  } = useSlider();

  const dotsArray = Array.from(Array(slides.length || 0).keys());

  return (
    <Tag
      {...rest}
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
      }}
    >
      {dotsArray.map((dot, index) => {
        const isActive = currentSlideIndex === index;

        return (
          <button
            aria-label={`Go to previous slide ${index + 1}`}
            aria-controls={`slider-track_${idFromContext}`}
            key={index}
            {...buttonProps}
            onClick={(e) => {
              goToSlideIndex(index);
              if (typeof buttonProps?.onClick === 'function') {
                buttonProps.onClick(e);
              }
            }}
            className={[
              isActive && activeDotClassName,
              dotClassName,
              buttonProps.className
            ].filter(Boolean).join(' ')}
            type="button"
          />
        )
      })}
    </Tag>
  );
};
