import { useCallback, useEffect, useRef } from "react";
import { Action } from "./reducer";

type Props = {
  sliderTrackRef: React.MutableRefObject<HTMLDivElement | null>
  isFullyScrolled: boolean
  isPaused: boolean
  enable?: boolean
  autoplaySpeed?: number
  dispatchSliderState: (action: Action) => void // eslint-disable-line no-unused-vars
}

export const useAutoplay = (props: Props): null => {
  const {
    isPaused,
    enable,
    isFullyScrolled,
    autoplaySpeed,
    dispatchSliderState
  } = props;

  const autoplayTimer = useRef<ReturnType<typeof setTimeout>>();

  const startAutoplay = useCallback(() => {
    const { current: timerID } = autoplayTimer;

    autoplayTimer.current = setInterval(() => {
      dispatchSliderState({
        type: 'GO_TO_NEXT_SLIDE',
        payload: {
          loop: true,
          isFullyScrolled,
        },
      });
    }, autoplaySpeed);

    return () => {
      if (timerID) clearInterval(timerID);
    };
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

  return null;
}
