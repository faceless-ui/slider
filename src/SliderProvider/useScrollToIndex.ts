import { useCallback, useEffect, useRef } from "react";
import { Props } from ".";
import { Action, SliderState } from "./reducer";

type ScrollToIndexProps = {
  sliderTrackRef: React.MutableRefObject<HTMLDivElement | null>
  onSlide: Props["onSlide"]
  sliderState: SliderState
  dispatchSliderState: (action: Action) => void // eslint-disable-line no-unused-vars
  scrollOffset: Props["scrollOffset"]
}

export const useScrollToIndex = (props: ScrollToIndexProps): null => {
  const {
    sliderState,
    onSlide,
    scrollOffset,
    sliderTrackRef
  } = props;

  const animationRef = useRef<number | undefined>();
  const prevScrollIndex = useRef<number | undefined>();

  const scrollToIndex = useCallback((incomingSlideIndex: number) => {
    const hasIndex = sliderState.slides[incomingSlideIndex];

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    if (hasIndex && sliderTrackRef.current) {
      const targetSlide = sliderState.slides[incomingSlideIndex];
      const targetSlideRef = targetSlide.ref.current;
      if (targetSlideRef) {
        const { offsetLeft } = targetSlideRef;

        animationRef.current = requestAnimationFrame(() => {
          if (sliderTrackRef.current) {
            sliderTrackRef.current.scrollTo({
              top: 0,
              left: (offsetLeft - (scrollOffset || 0)),
              behavior: 'smooth',
            });
          }
        });
      }

      if (typeof onSlide === 'function') onSlide(incomingSlideIndex);
    }
  }, [
    sliderState.slides,
    onSlide,
    scrollOffset,
    sliderTrackRef
  ]);

  // auto-scroll to the target index only when "scrollIndex" changes
  useEffect(() => {
    if (sliderState.scrollIndex !== undefined && prevScrollIndex.current !== sliderState.scrollIndex) {
      scrollToIndex(sliderState.scrollIndex);
      prevScrollIndex.current = sliderState.scrollIndex;
    }
  }, [
    sliderState.scrollIndex,
    scrollToIndex,
  ]);

  useEffect(() => {
    () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [])

  return null;
}
