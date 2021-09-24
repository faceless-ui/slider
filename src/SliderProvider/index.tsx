import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { Props } from './types';
import SliderContext from '../SliderContext';
import reducer from './reducer';

const SliderProvider: React.FC<Props> = (props) => {
  const {
    children,
    currentSlideIndex: slideIndexFromProps, // allow force update via prop
    onSlide,
    slidesToShow = 3,
    slideOnSelect,
    useScrollSnap,
  } = props;

  const prevSlideIndexFromProps = useRef<number | undefined>();
  const sliderTrackRef = useRef<HTMLElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [slides, dispatchSlide] = useReducer(reducer, []);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | undefined>();
  const [slideWidth, setSlideWidth] = useState<string | undefined>();

  useEffect(() => {
    smoothscroll.polyfill(); // enables scrollTo.behavior: 'smooth' on Safari
  }, []);

  const scrollToIndex = useCallback((incomingSlideIndex) => {
    const hasIndex = slides[incomingSlideIndex];

    if (hasIndex && sliderTrackRef.current) {
      const targetSlide = slides[incomingSlideIndex];
      if (targetSlide) {
        const { ref: { current: { offsetLeft } } } = targetSlide;

        sliderTrackRef.current.scrollTo({
          top: 0,
          left: offsetLeft,
          behavior: 'smooth',
        });
      }

      if (typeof onSlide === 'function') onSlide(incomingSlideIndex);
    }
  }, [
    slides,
    sliderTrackRef,
    onSlide,
  ]);

  const goToSlideIndex = useCallback((incomingIndex) => {
    scrollToIndex(incomingIndex);
  }, [scrollToIndex]);

  const handlePrev = useCallback(() => {
    const indexToUse = selectedSlideIndex || currentSlideIndex;
    const hasPrev = indexToUse - 1 >= 0;

    if (hasPrev) {
      const prevIndex = currentSlideIndex - 1;
      scrollToIndex(prevIndex);
    }
  }, [
    currentSlideIndex,
    scrollToIndex,
    selectedSlideIndex,
  ]);

  const handleNext = useCallback(() => {
    const indexToUse = selectedSlideIndex || currentSlideIndex;
    const nextIndex = indexToUse + 1;
    const hasNext = nextIndex < slides.length;

    if (hasNext) {
      scrollToIndex(nextIndex);
    }
  }, [
    currentSlideIndex,
    scrollToIndex,
    slides.length,
    selectedSlideIndex,
  ]);

  useEffect(() => {
    if (typeof slideIndexFromProps === 'number') {
      const hasChanged = prevSlideIndexFromProps.current !== slideIndexFromProps; // this is needed because 'slides' is a dependent of 'goToSlideIndex'
      if (hasChanged) {
        setSelectedSlideIndex(slideIndexFromProps);
        scrollToIndex(slideIndexFromProps);
      }
      prevSlideIndexFromProps.current = slideIndexFromProps;
    }
  }, [
    slideIndexFromProps,
    scrollToIndex,
  ]);

  useEffect(() => {
    const newSlideWidth = `${(1 / slidesToShow) * 100}%`;
    setSlideWidth(newSlideWidth);
  }, [
    slidesToShow,
  ]);

  useEffect(() => {
    if (slides) {
      const allIntersections = slides.map(({ isIntersecting }) => isIntersecting);
      const newSlideIndex = allIntersections.indexOf(true); // first one
      setCurrentSlideIndex(newSlideIndex);
    }
  }, [slides]);

  const context = {
    sliderTrackRef,
    currentSlideIndex,
    setCurrentSlideIndex,
    scrollRatio,
    setScrollRatio,
    goToNextSlide: handleNext,
    goToPrevSlide: handlePrev,
    goToSlideIndex,
    slides,
    dispatchSlide,
    slideWidth,
    slidesToShow,
    slideOnSelect,
    useScrollSnap,
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
