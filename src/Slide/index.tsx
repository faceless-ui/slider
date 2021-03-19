import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import useSlider from '../useSlider';
import { Props } from './types';

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
  const slideRef = useRef(null);

  const {
    dispatchSlide,
    sliderTrackRef,
    goToSlideIndex,
    slideWidth,
    slideOnSelect,
  } = slider;

  useEffect(() => {
    let observer;
    const slideRefCopy = slideRef.current;

    if (slideRefCopy && sliderTrackRef?.current) {
      observer = new IntersectionObserver((entries) => {
        const {
          offsetWidth,
          offsetHeight,
        } = slideRefCopy;

        entries.forEach((entry) => {
          dispatchSlide({
            index,
            slide: {
              isIntersecting: entry.isIntersecting,
              width: offsetWidth,
              height: offsetHeight,
            },
          });
        });
      }, {
        root: sliderTrackRef.current,
        rootMargin: '0px',
        threshold: 0.5,
      });

      observer.observe(slideRefCopy);
    }

    return () => {
      if (observer) {
        observer.unobserve(slideRefCopy);
      }
    };
  }, [
    dispatchSlide,
    sliderTrackRef,
    index,
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
          ...htmlAttributes.style,
        },
      }}
    >
      {children && children}
    </Tag>
  );
};

export default Slide;
