import React, {
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
  useGhostSlide?: boolean
  currentSlideIndex?: number
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
    useGhostSlide,
    currentSlideIndex: slideIndexFromProps = 0
  } = props;

  const sliderTrackRef = useDragScroll({
    scrollYAxis: false,
  });

  const [scrollRatio, setScrollRatio] = useState(0);
  const [slideWidth, setSlideWidth] = useState<string | undefined>();
  const [isPaused, setIsPaused] = useState(false);
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);

  const indexFromPropsRef = useRef(slideIndexFromProps);

  const [sliderState, dispatchSliderState] = useReducer(reducer, {
    currentSlideIndex: slideIndexFromProps,
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

  const startAutoplay = useCallback(() => {
    const { current: timerID } = autoplayTimer;

    autoplayTimer.current = setInterval(() => {
      dispatchSliderState({
        type: 'GO_TO_NEXT_SLIDE',
        payload: {
          loop: true,
          isFullyScrolled
        },
      });
    }, autoplaySpeed);

    return () => {
      if (timerID) clearInterval(timerID);
    };
  }, [
    isFullyScrolled,
    autoplaySpeed
  ]);

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

  // NOTE: for performance we set another state for 'isFullyScrolled' to avoid using `scrollRatio` directly as callback dependency
  useEffect(() => {
    if (scrollRatio === 1) setIsFullyScrolled(true);
    else setIsFullyScrolled(false);
  }, [scrollRatio])

  // NOTE: let props control the slider using 'currentSlideIndex', if desired
  useEffect(() => {
    if (typeof slideIndexFromProps !== 'undefined' && slideIndexFromProps !== indexFromPropsRef.current && slideIndexFromProps !== sliderState.currentSlideIndex) {
      dispatchSliderState({
        type: 'GO_TO_SLIDE_INDEX',
        payload: {
          index: slideIndexFromProps,
          scrollToIndex
        },
      });
    }

    indexFromPropsRef.current = slideIndexFromProps;
  }, [slideIndexFromProps])

  const context: ISliderContext = {
    sliderTrackRef,
    scrollRatio,
    ...sliderState,
    setScrollRatio,
    goToNextSlide: () => {
      dispatchSliderState({
        type: 'GO_TO_NEXT_SLIDE',
        payload: {
          loop: !useFreeScroll,
          scrollToIndex
        },
      });
    },
    goToPrevSlide: () => {
      dispatchSliderState({
        type: 'GO_TO_PREV_SLIDE',
        payload: {
          loop: !useFreeScroll,
          scrollToIndex
        },
      });
    },
    goToSlideIndex: (index: number) => {
      dispatchSliderState({
        type: 'GO_TO_SLIDE_INDEX',
        payload: {
          index,
          scrollToIndex
        }
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
    useGhostSlide
  };

  return (
    <SliderContext.Provider
      value={context}
    >
      {(children && (typeof children === 'function' ? children({ ...context }) : children))}
    </SliderContext.Provider>
  );
};

export default SliderProvider;
