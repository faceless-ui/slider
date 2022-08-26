import { useCallback, useEffect, useRef } from "react";

type Props = {
  sliderTrackRef: React.MutableRefObject<HTMLDivElement | null>
  isFullyScrolled: boolean
  isPaused: boolean
  enable?: boolean
  marqueeSpeed?: number
}

export const useMarquee = (props: Props): null => {
  const {
    sliderTrackRef,
    isFullyScrolled,
    enable,
    isPaused,
    marqueeSpeed // NOTE: this is technically a requested frame rate
  } = props;

  const animationRef = useRef<number | undefined>();
  const prevTimestamp = useRef<number | undefined>();
  const timeSincePrev = useRef<number>(0);

  const scroll = useCallback((timestamp: number) => {
    if (enable && !isPaused) {
      const elapsed = prevTimestamp.current ? timestamp - prevTimestamp.current : 0;
      prevTimestamp.current = timestamp;
      timeSincePrev.current += elapsed;

      if (!marqueeSpeed || (marqueeSpeed && timeSincePrev.current > marqueeSpeed)) {
        if (sliderTrackRef.current) {
          if (!isFullyScrolled) sliderTrackRef.current.scrollLeft = sliderTrackRef.current.scrollLeft + 1;
          else sliderTrackRef.current.scrollLeft = 0;
        }
        timeSincePrev.current = 0;
      }

      // NOTE: recursively request animation to create a loop at ~60fps
      animationRef.current = window.requestAnimationFrame(scroll);
    }
  }, [
    sliderTrackRef,
    enable,
    isPaused,
    marqueeSpeed,
    isFullyScrolled
  ]);

  useEffect(() => {
    if (enable && !isPaused) animationRef.current = window.requestAnimationFrame(scroll);
    if (isPaused && animationRef.current) cancelAnimationFrame(animationRef.current);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    scroll,
    enable,
    isPaused
  ]);

  return null;
}
