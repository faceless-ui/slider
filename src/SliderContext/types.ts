import { MutableRefObject } from 'react';
import { Props } from '../SliderProvider/types';
import { Slide } from '../Slide/types';

export interface ISliderContext extends Props {
  sliderTrackRef: MutableRefObject<HTMLElement>,
  currentSlideIndex: number,
  setCurrentSlideIndex?: (number) => void
  scrollRatio: number
  setScrollRatio: (number) => void
  goToNextSlide: () => void
  goToPrevSlide: () => void
  goToSlideIndex: (number) => void
  slides: Slide[]
  dispatchSlide: (slide: Slide) => void
  slideWidth?: string
}
