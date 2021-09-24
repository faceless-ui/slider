import React, { useCallback, useEffect, useRef } from 'react';
import useSlider from '../useSlider';
import { Props } from './types';

const SliderTrack: React.FC<Props> = (props) => {
  const {
    id,
    className,
    htmlElement = 'div',
    children,
    htmlAttributes = {},
  } = props;

  const {
    sliderTrackRef,
    setScrollRatio,
    slides,
    setCurrentSlideIndex,
    slideWidth,
    slidesToShow,
    useScrollSnap,
  } = useSlider();

  const hasAddedScrollListener = useRef(false);
  const animationFrameID = useRef<number | undefined>();

  const onAnimationFrame = useCallback(() => {
    const track = sliderTrackRef.current;
    const newScrollRatio = track.scrollLeft / (track.scrollWidth - track.clientWidth);
    setScrollRatio(newScrollRatio);
    const currentIntersecting = slides.findIndex((slide) => slide && slide.isIntersecting); // the first slide that is intersecting
    setCurrentSlideIndex(currentIntersecting);
  }, [
    sliderTrackRef,
    setScrollRatio,
    slides,
    setCurrentSlideIndex,
  ]);

  const handleScroll = useCallback(() => {
    const track = sliderTrackRef.current;

    if (track) {
      // prevent compounding events
      if (animationFrameID) cancelAnimationFrame(animationFrameID.current);
      const requestID = requestAnimationFrame(onAnimationFrame);
      animationFrameID.current = requestID;
    }
  }, [
    sliderTrackRef,
    onAnimationFrame,
  ]);

  useEffect(() => {
    const track = sliderTrackRef.current;

    if (track && hasAddedScrollListener.current === false) {
      track.addEventListener('scroll', handleScroll, false);
      hasAddedScrollListener.current = true;
    }

    return () => {
      hasAddedScrollListener.current = false;
      if (track) {
        track.removeEventListener('scroll', handleScroll);
      }
    };
  }, [sliderTrackRef, handleScroll]);

  const Tag = htmlElement as React.ElementType;

  // TODO: use this to support scrolling the last slide fully into position (flush left)
  const renderGhostSlide = false; // slidesToShow > 1;

  return (
    <Tag
      {...{
        id,
        className,
        ...htmlAttributes,
        style: {
          display: 'flex',
          overflowX: 'scroll', // 'overflow: touch' does not work when 'auto'
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: (slideWidth && useScrollSnap) ? 'x mandatory' : undefined, // only apply after slide width has populated
          ...htmlAttributes.style,
        },
        ref: sliderTrackRef,
      }}
    >
      {children && children}
      {renderGhostSlide && (
        <div
          style={{
            flexShrink: 0,
            width: `calc(${slideWidth} * ${slidesToShow - 1})`,
          }}
        >
          &nbsp;
        </div>
      )}
    </Tag>
  );
};

export default SliderTrack;
