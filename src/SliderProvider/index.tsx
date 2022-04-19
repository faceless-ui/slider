import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import SliderContext, { ISliderContext } from '../SliderContext';
import reducer from './reducer';
import useDragScroll from './useDragScroll';

export type ChildFunction = (context: ISliderContext) => React.ReactNode; // eslint-disable-line no-unused-vars

export type Props = {
  onSlide?: (index: number) => void // eslint-disable-line no-unused-vars
  slidesToShow?: number
  slideOnSelect?: boolean
  useFreeScroll?: boolean
  scrollOffset?: number
  autoPlay?: boolean
  autoplaySpeed?: number
  pauseOnHover?: boolean
  pause?: boolean
  children: React.ReactNode | ChildFunction
}

const SliderProvider: React.FC<Props> = (props) => {
  const {
    children,
    onSlide,
    slidesToShow = 3,
    slideOnSelect,
    useFreeScroll,
    scrollOffset = 0,
    autoPlay,
    autoplaySpeed = 2000,
    pauseOnHover = true,
    pause,
  } = props;

  const sliderTrackRef = useDragScroll({
    scrollYAxis: false,
  });

  const [scrollRatio, setScrollRatio] = useState(0);
  const [slideWidth, setSlideWidth] = useState<string | undefined>();
  const [isPaused, setIsPaused] = useState(false);

  const [sliderState, dispatchSliderState] = useReducer(reducer, {
    currentSlideIndex: 0,
    selectedSlideIndex: undefined,
    slides: [],
  });

  const prevScrollIndex = useRef<number | undefined>();
  const autoplayTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    smoothscroll.polyfill(); // enables scrollTo.behavior: 'smooth' on Safari
  }, []);


  const scrollToIndex = useCallback((incomingSlideIndex: number) => {
    const hasIndex = sliderState.slides[incomingSlideIndex];

    if (hasIndex && sliderTrackRef.current) {
      const targetSlide = sliderState.slides[incomingSlideIndex];
      const targetSlideRef = targetSlide.ref.current;
      if (targetSlideRef) {
        const { offsetLeft } = targetSlideRef;

        sliderTrackRef.current.scrollTo({
          top: 0,
          left: (offsetLeft - scrollOffset),
          behavior: 'smooth',
        });
      }

      if (typeof onSlide === 'function') onSlide(incomingSlideIndex);
    }
  }, [
    sliderState.slides,
    sliderTrackRef,
    onSlide,
    scrollOffset,
  ]);

  useEffect(() => {
    const newSlideWidth = `${(slidesToShow > 1 ? 1 / slidesToShow : slidesToShow) * 100}%`;
    setSlideWidth(newSlideWidth);
  }, [
    slidesToShow,
  ]);

  // auto-scroll to target index only on changes to scrollIndex
  useEffect(() => {
    if (sliderState.scrollIndex !== undefined && prevScrollIndex.current !== sliderState.scrollIndex) {
      scrollToIndex(sliderState.scrollIndex);
      prevScrollIndex.current = sliderState.scrollIndex;
    }
  }, [
    sliderState.scrollIndex,
    scrollToIndex,
  ]);

  const startAutoplay = useCallback(() => {
    const { current: timerID } = autoplayTimer;

    autoplayTimer.current = setInterval(() => {
      dispatchSliderState({
        type: 'GO_TO_NEXT_SLIDE',
        payload: {
          loop: true,
        },
      });
    }, autoplaySpeed);

    return () => {
      if (timerID) clearInterval(timerID);
    };
  }, [autoplaySpeed]);

  const stopAutoplay = useCallback(() => {
    const { current: autoPlayTimerID } = autoplayTimer;
    if (autoPlayTimerID) clearInterval(autoPlayTimerID);
  }, []);

  useEffect(() => {
    if (!isPaused && autoPlay) {
      startAutoplay();
    }

    if (isPaused || !autoPlay) {
      stopAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [
    isPaused,
    autoPlay,
    startAutoplay,
    stopAutoplay,
  ]);

  // let user control pause, if they need to
  useEffect(() => {
    if (typeof pause !== 'undefined') {
      setIsPaused(pause);
    }
  }, [pause]);

  const context = {
    sliderTrackRef,
    scrollRatio,
    ...sliderState,
    setScrollRatio,
    goToNextSlide: () => {
      dispatchSliderState({
        type: 'GO_TO_NEXT_SLIDE',
        payload: {
          loop: !useFreeScroll,
        },
      });
    },
    goToPrevSlide: () => {
      dispatchSliderState({
        type: 'GO_TO_PREV_SLIDE',
        payload: {
          loop: !useFreeScroll,
        },
      });
    },
    goToSlideIndex: () => {
      dispatchSliderState({
        type: 'GO_TO_NEXT_SLIDE',
      });
    },
    dispatchSlide: (slide) => {
      dispatchSliderState({
        type: 'UPDATE_SLIDE',
        payload: {
          slide,
        },
      });
    },
    slideWidth,
    slidesToShow,
    slideOnSelect,
    useFreeScroll,
    scrollOffset,
    setIsPaused,
    isPaused,
    pauseOnHover,
  } as ISliderContext;

  return (
    <SliderContext.Provider
      value={context}
    >
      {(children && typeof children === 'function' ? (
        <Fragment>
          {children({ ...context })}
        </Fragment>
      ) : (
        <Fragment>
          {children}
        </Fragment>
      ))}
    </SliderContext.Provider>
  );
};

export default SliderProvider;
