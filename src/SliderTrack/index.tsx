import React, { HTMLProps, useCallback, useEffect, useRef } from 'react';
import { useSlider } from '../useSlider/index.js';
import { getGhostSlideWidth } from './getGhostSlideWidth.js';

export interface SliderTrackProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  children?: React.ReactNode
}

export const SliderTrack: React.FC<SliderTrackProps> = (props) => {
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
    isDragging,
    autoPlay,
    id: idFromContext,
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
        // NOTE: the 'aria-controls' attribute of the toggler should match this ID
        id: `slider-track_${idFromContext}`,
        'aria-live': autoPlay ? "polite" : "off", // announce slide changes to screen readers when autoplay is enabled
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
          // TODO: fire external methods from props, too
        },
        onMouseLeave: () => {
          if (pauseOnHover) setIsPaused(false);
          // TODO: fire external methods from props, too
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
