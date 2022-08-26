import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import SliderContext, { ISliderContext } from '../SliderContext';
import reducer from './reducer';
import useDragScroll from './useDragScroll';
import { useBreakpoints } from './useBreakpoints';
import { useMarquee } from './useMarquee';
import { useAutoplay } from './useAutoplay';
import { useScrollToIndex } from './useScrollToIndex';

export type ChildFunction = (context: ISliderContext) => React.ReactNode; // eslint-disable-line no-unused-vars

export type Settings = {
  slidesToShow?: number
  slideOnSelect?: boolean
  scrollable?: boolean
  useFreeScroll?: boolean // IMPORTANT: being deprecated, use `scrollable` instead
  dragScroll?: boolean
  scrollSnap?: boolean
  scrollOffset?: number
  autoPlay?: boolean
  autoplaySpeed?: number
  marquee?: boolean
  marqueeSpeed?: number
  pauseOnHover?: boolean
  alignLastSlide?: 'trackLeft' | 'offsetLeft' | string | number
}

export type Props = Settings & {
  children: React.ReactNode | ChildFunction
  currentSlideIndex?: number
  onSlide?: (index: number) => void // eslint-disable-line no-unused-vars
  pause?: boolean
  breakpoints?: {
    [key: string]: Omit<Props, "children" | "breakpoints">
  }
}

const SliderProvider: React.FC<Props> = (props) => {
  const {
    children,
    currentSlideIndex: slideIndexFromProps = 0,
    onSlide,
    pause,
  } = props;

  const settings = useBreakpoints(props);

  const {
    slidesToShow = 3,
    slideOnSelect,
    scrollable: scrollableFromProps = true,
    useFreeScroll,
    dragScroll,
    scrollSnap,
    scrollOffset = 0,
    autoPlay,
    autoplaySpeed = 2000,
    marquee,
    marqueeSpeed,
    pauseOnHover = true,
    alignLastSlide,
  } = settings;

  if (useFreeScroll !== undefined) {
    console.warn('`useFreeScroll` prop will be deprecated in the next major release, use `scrollable` instead (`true` by default)');
  }

  // NOTE: this this only while `useFreeScroll` is still supported, see warning above
  const scrollable = scrollableFromProps === undefined ? useFreeScroll : scrollableFromProps;

  const [scrollRatio, setScrollRatio] = useState(0);
  const [slideWidth, setSlideWidth] = useState<string | undefined>();
  const [isPaused, setIsPaused] = useState(false);
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const [sliderState, dispatchSliderState] = useReducer(reducer, {
    currentSlideIndex: slideIndexFromProps,
    selectedSlideIndex: undefined,
    slides: [],
  });

  useDragScroll({
    ref: sliderTrackRef,
    scrollYAxis: false,
    enable: dragScroll || (scrollable && dragScroll !== false)
  });

  useMarquee({
    sliderTrackRef,
    isFullyScrolled,
    isPaused,
    enable: marquee && !autoPlay,
    marqueeSpeed
  })

  useAutoplay({
    sliderTrackRef,
    isFullyScrolled,
    isPaused,
    enable: autoPlay,
    autoplaySpeed,
    dispatchSliderState
  })

  useScrollToIndex({
    sliderTrackRef,
    dispatchSliderState,
    onSlide,
    scrollOffset,
    sliderState
  })

  const indexFromPropsRef = useRef(slideIndexFromProps);

  useEffect(() => {
    smoothscroll.polyfill(); // enables scrollTo.behavior: 'smooth' on Safari
  }, []);

  useEffect(() => {
    const newSlideWidth = `${(slidesToShow > 1 ? 1 / slidesToShow : slidesToShow) * 100}%`;
    setSlideWidth(newSlideWidth);
  }, [
    slidesToShow,
  ]);

  // let user control pause, if they need to
  useEffect(() => {
    if (typeof pause !== 'undefined') setIsPaused(pause);
  }, [pause]);

  // NOTE: for performance we set another state for 'isFullyScrolled' to avoid using `scrollRatio` directly as callback dependency
  useEffect(() => {
    if (scrollRatio === 1) setIsFullyScrolled(true);
    else setIsFullyScrolled(false);
  }, [scrollRatio])

  // NOTE: let props control the slider using 'currentSlideIndex' (aliased as 'slideIndexFromProps')
  useEffect(() => {
    if (typeof slideIndexFromProps !== 'undefined' && slideIndexFromProps !== indexFromPropsRef.current && slideIndexFromProps !== sliderState.currentSlideIndex) {
      dispatchSliderState({
        type: 'GO_TO_SLIDE_INDEX',
        payload: {
          index: slideIndexFromProps,
        },
      });
    }

    indexFromPropsRef.current = slideIndexFromProps;
  }, [
    slideIndexFromProps,
    sliderState.currentSlideIndex
  ]);

  const context: ISliderContext = {
    sliderTrackRef,
    scrollRatio,
    ...sliderState,
    setScrollRatio,
    goToNextSlide: () => {
      dispatchSliderState({
        type: 'GO_TO_NEXT_SLIDE',
        payload: {
          loop: !scrollable,
        },
      });
    },
    goToPrevSlide: () => {
      dispatchSliderState({
        type: 'GO_TO_PREV_SLIDE',
        payload: {
          loop: !scrollable,
        },
      });
    },
    goToSlideIndex: (index: number) => {
      dispatchSliderState({
        type: 'GO_TO_SLIDE_INDEX',
        payload: {
          index,
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
    autoPlay,
    slideWidth,
    slidesToShow,
    slideOnSelect,
    scrollable,
    dragScroll,
    scrollSnap,
    scrollOffset,
    setIsPaused,
    isPaused,
    pauseOnHover,
    alignLastSlide
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
