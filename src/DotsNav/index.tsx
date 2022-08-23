import React, { HTMLProps } from 'react';
import useSlider from '../useSlider';

export interface DotsNavProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  dotClassName?: string
  activeDotClassName?: string
  buttonProps?: HTMLProps<HTMLButtonElement>
}

const DotsNav: React.FC<DotsNavProps> = (props) => {
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
    goToSlideIndex
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

export default DotsNav;
