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
    marqueeSpeed
  } = props;

  const marqueeTimer = useRef<ReturnType<typeof setTimeout>>();

  const startMarquee = useCallback(() => {
    const { current: timerID } = marqueeTimer;

    if (sliderTrackRef.current) {
      marqueeTimer.current = setInterval(() => {
        sliderTrackRef.current?.scrollTo({
          top: 0,
          left: !isFullyScrolled ? (sliderTrackRef.current.scrollLeft + 1) : 0,
          behavior: !isFullyScrolled ? 'smooth' : 'auto',
        });
      }, marqueeSpeed);
    }

    return () => {
      if (timerID) clearInterval(timerID);
    };
  }, [
    isFullyScrolled,
    marqueeSpeed,
  ]);

  const stopMarquee = useCallback(() => {
    const { current: timerID } = marqueeTimer;
    if (timerID) clearInterval(timerID);
  }, []);

  useEffect(() => {
    if (!isPaused && enable) startMarquee()
    if (isPaused || !enable) stopMarquee();
    return () => stopMarquee();
  }, [
    isPaused,
    startMarquee,
    stopMarquee
  ]);

  return null;
}
