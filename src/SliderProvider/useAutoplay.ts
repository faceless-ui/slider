import { useCallback, useEffect, useRef } from "react";
import { Action } from "./reducer";

type Args = {
  sliderTrackRef: React.MutableRefObject<HTMLDivElement | null>
  isFullyScrolled: boolean
  isPaused: boolean
  enable?: boolean
  autoplaySpeed?: number
  dispatchSliderState: (action: Action) => void // eslint-disable-line no-unused-vars
}

export type UseAutoplay = (args: Args) => null // eslint-disable-line no-unused-vars

export const useAutoplay: UseAutoplay = (args) => {
  const {
    isPaused,
    enable,
    isFullyScrolled,
    autoplaySpeed,
    dispatchSliderState
  } = args;

  const animationRef = useRef<number | null>(null);
  const autoplayTimer = useRef<ReturnType<typeof setTimeout>>();

  const startAutoplay = useCallback(() => {
    autoplayTimer.current = setInterval(() => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      animationRef.current = requestAnimationFrame(() => {
        dispatchSliderState({
          type: 'GO_TO_NEXT_SLIDE',
          payload: {
            loop: true,
            isFullyScrolled,
          },
        })
      });
    }, autoplaySpeed);
  }, [
    isFullyScrolled,
    autoplaySpeed,
    dispatchSliderState
  ]);

  const stopAutoplay = useCallback(() => {
    const { current: autoPlayTimerID } = autoplayTimer;
    if (autoPlayTimerID) clearInterval(autoPlayTimerID);
  }, []);

  useEffect(() => {
    if (!isPaused && enable) startAutoplay();
    if (isPaused || !enable) stopAutoplay();
    return () => stopAutoplay();
  }, [
    isPaused,
    enable,
    startAutoplay,
    stopAutoplay,
  ]);

  useEffect(() => {
    () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (autoplayTimer.current) {
        clearTimeout(autoplayTimer.current);
      }
    }
  }, [])

  return null;
}
