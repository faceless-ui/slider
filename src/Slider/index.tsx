import React, {
  useCallback,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Props } from './types';
import SliderContext from '../SliderContext';
import reducer from './reducer';

const Slider: React.FC<Props> = (props) => {
  const {
    children,
  } = props;

  const sliderTrackRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [slides, dispatchSlide] = useReducer(reducer, []);
  const currentSlideIndex = slides.findIndex((slide) => slide && slide.isIntersecting); // the first slide that is intersecting

  const handleNext = useCallback(() => {
    const hasNext = currentSlideIndex + 1 < slides.length;

    if (hasNext && sliderTrackRef.current) {
      const passedSlides = slides.slice(0, currentSlideIndex + 1); // all up to the next one

      const scrollPos = passedSlides.reduce((pos, slide) => pos + slide.width, 0);

      sliderTrackRef.current.scrollTo({
        top: 0,
        left: scrollPos,
        behavior: 'smooth',
      });
    }
  }, [
    slides,
    sliderTrackRef,
    currentSlideIndex,
  ]);

  const handlePrev = useCallback(() => {
    const hasPrev = currentSlideIndex - 1 >= 0;

    if (hasPrev && sliderTrackRef.current) {
      const passedSlides = slides.slice(0, currentSlideIndex - 1); // all up to the previous one

      const scrollPos = passedSlides.reduce((pos, slide) => pos + slide.width, 0);

      sliderTrackRef.current.scrollTo({
        top: 0,
        left: scrollPos,
        behavior: 'smooth',
      });
    }
  }, [
    slides,
    sliderTrackRef,
    currentSlideIndex,
  ]);

  return (
    <SliderContext.Provider
      value={{
        sliderTrackRef,
        currentSlideIndex,
        scrollRatio,
        setScrollRatio,
        nextSlide: handleNext,
        prevSlide: handlePrev,
        slides,
        dispatchSlide,
      }}
    >
      {children && children}
    </SliderContext.Provider>
  );
};

export default Slider;
