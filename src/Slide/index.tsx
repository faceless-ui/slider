import React, {
  HTMLProps,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useSlider from '../useSlider';
import useIntersection from './useIntersection';

export interface ISlide {
  index: number
  ref: React.MutableRefObject<HTMLElement | null>
  isIntersecting: boolean
}

export interface SlideProps extends HTMLProps<HTMLElement> {
  index: number
  htmlElement?: React.ElementType
  children?: React.ReactNode
}

const Slide: React.FC<SlideProps> = (props) => {
  const {
    index,
    htmlElement = 'div',
    children,
    style: styleFromProps,
    onClick: onClickFromProps,
    ...rest
  } = props;

  const [style, setStyle] = useState<React.CSSProperties | undefined>();
  const slider = useSlider();
  const slideRef = useRef<HTMLElement | null>(null);

  const {
    dispatchSlide,
    sliderTrackRef,
    goToSlideIndex,
    slideWidth,
    slideOnSelect,
    scrollSnap,
    scrollOffset,
  } = slider;

  const prevIntersection = useRef<boolean | undefined>();

  const { isIntersecting } = useIntersection(slideRef, {
    root: sliderTrackRef,
    rootMargin: scrollOffset ? `0px -${scrollOffset}px 0px -${scrollOffset}px` : '-1px',
  });

  useEffect(() => {
    const intersectionChange = prevIntersection.current !== isIntersecting;

    if (intersectionChange) {
      dispatchSlide({
        index,
        ref: slideRef,
        isIntersecting,
      });

      prevIntersection.current = isIntersecting;
    }
  }, [
    dispatchSlide,
    isIntersecting,
    index,
  ]);

  useEffect(() => {
    if (scrollSnap) {
      setStyle({
        scrollSnapStop: 'always',
        scrollSnapAlign: 'start',
      })
    } else {
      setStyle(undefined);
    }
  }, [scrollSnap]);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (slideOnSelect) {
      goToSlideIndex(index);
    }

    if (typeof onClickFromProps === 'function') {
      onClickFromProps(e);
    }
  }, [
    slideOnSelect,
    index,
    goToSlideIndex,
    onClickFromProps
  ]);

  const Tag = htmlElement as React.ElementType;
  const mergedStyle = {
    flexShrink: 0,
    width: slideWidth,
    ...style || {},
    ...styleFromProps || {},
  }

  return (
    <Tag
      {...{
        ref: slideRef,
        onClick: handleClick,
        ...rest,
        style: mergedStyle,
      }}
    >
      {children && children}
    </Tag>
  );
};

export default Slide;
