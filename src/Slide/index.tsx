import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import useSlider from '../useSlider';
import useIntersection from './useIntersection';

export interface ISlide {
  index: number
  ref: React.MutableRefObject<HTMLElement | null>
  isIntersecting: boolean
}

export type Props = {
  index: number
  id?: string
  className?: string
  htmlElement?: React.ElementType
  htmlAttributes?: {
    [key: string]: unknown
    style?: React.CSSProperties
  }
  slideToSelfOnClick?: boolean
  children?: React.ReactNode
}

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
  const slideRef = useRef<HTMLElement | null>(null);

  const {
    dispatchSlide,
    sliderTrackRef,
    goToSlideIndex,
    slideWidth,
    slideOnSelect,
    useFreeScroll,
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
          scrollSnapAlign: !useFreeScroll ? 'start' : undefined,
          scrollSnapStop: 'always',
          ...htmlAttributes.style,
        },
      }}
    >
      {children && children}
    </Tag>
  );
};

export default Slide;
