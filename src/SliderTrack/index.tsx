import React, { HTMLProps, useCallback, useEffect, useRef } from 'react';
import useSlider from '../useSlider';

export interface SliderTrackProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  children?: React.ReactNode
}

const SliderTrack: React.FC<SliderTrackProps> = (props) => {
  const {
    htmlElement: Tag = 'div',
    children,
    style,
    ...rest
  } = props;

  const {
    sliderTrackRef,
    setScrollRatio,
    slideWidth,
    slidesToShow,
    useFreeScroll,
    setIsPaused,
    pauseOnHover,
    useGhostSlide
  } = useSlider();

  const hasAddedScrollListener = useRef(false);
  const animationFrameID = useRef<number | undefined>();

  const getScrollRatio = useCallback(() => {
    const track = sliderTrackRef.current;
    if (track) {
      const newScrollRatio = track.scrollLeft / (track.scrollWidth - track.clientWidth);
      setScrollRatio(newScrollRatio);
    }
  }, [
    sliderTrackRef,
    setScrollRatio,
  ]);

  const onScroll = useCallback(() => {
    const track = sliderTrackRef.current;

    if (track) {
      // prevent compounding events
      if (animationFrameID.current) cancelAnimationFrame(animationFrameID.current);
      const requestID = requestAnimationFrame(getScrollRatio);
      animationFrameID.current = requestID;
    }
  }, [
    sliderTrackRef,
    getScrollRatio,
  ]);

  useEffect(() => {
    const track = sliderTrackRef.current;

    if (track && hasAddedScrollListener.current === false) {
      track.addEventListener('scroll', onScroll, false);
      hasAddedScrollListener.current = true;
    }

    return () => {
      hasAddedScrollListener.current = false;
      if (track) {
        track.removeEventListener('scroll', onScroll);
      }
    };
  }, [
    sliderTrackRef,
    onScroll,
  ]);

  return (
    <Tag
      {...{
        ...rest,
        style: {
          position: 'relative',
          display: 'flex',
          overflowX: 'scroll', // 'overflow: touch' does not work when 'auto'
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: (slideWidth && !useFreeScroll) ? 'x mandatory' : undefined, // only apply after slide width has populated
          ...style,
        },
        ref: sliderTrackRef,
        onMouseEnter: () => {
          if (pauseOnHover) setIsPaused(true);
        },
        onMouseLeave: () => {
          if (pauseOnHover) setIsPaused(false);
        },
      }}
    >
      {children && children}
      {useGhostSlide && (
        <div
          style={{
            flexShrink: 0,
            width: `calc(${slideWidth} * ${slidesToShow - 1})`,
            pointerEvents: 'none'
          }}
        >
          &nbsp;
        </div>
      )}
    </Tag>
  );
};

export default SliderTrack;
