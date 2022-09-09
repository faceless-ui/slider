import React, { HTMLProps, useCallback, useEffect, useRef } from 'react';
import useSlider from '../useSlider';
import { getGhostSlideWidth } from './getGhostSlideWidth';

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

  const sliderContext = useSlider();

  const {
    sliderTrackRef,
    setScrollRatio,
    slideWidth,
    scrollable,
    scrollSnap,
    setIsPaused,
    pauseOnHover,
    alignLastSlide,
    isDragging
  } = sliderContext;

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

  // NOTE: handle updates to the track's current scroll, which could originate from either the user or the program
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

  // NOTE: if the user does not want scroll enabled, we need to remove the event listener without canceling programmatic scroll
  useEffect(() => {
    const track = sliderTrackRef.current;

    if (track) {
      if (!scrollable) {
        track.addEventListener('wheel', (e) => { e.preventDefault() })
      }
    }

    return () => {
      if (track) {
        track.removeEventListener('scroll', onScroll);
      }
    }
  }, [
    scrollable,
    onScroll,
    sliderTrackRef
  ])

  const ghostSlideWidth = getGhostSlideWidth(sliderContext);

  let scrollSnapType;
  if (scrollSnap && slideWidth) {
    scrollSnapType = !isDragging ? 'x mandatory' : 'none';
  }

  return (
    <Tag
      {...{
        ...rest,
        style: {
          position: 'relative',
          display: 'flex',
          overflowX: 'scroll', // NOTE: 'WebkitOverflowScrolling: touch' does not work when 'auto'
          WebkitOverflowScrolling: 'touch',
          // NOTE: only apply after slide width has populated and while NOT dragging
          scrollSnapType,
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
      {alignLastSlide !== undefined && (
        <div
          style={{
            flexShrink: 0,
            width: ghostSlideWidth,
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
