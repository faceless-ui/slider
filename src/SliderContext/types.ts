import { MutableRefObject } from 'react';
import { Props } from '../SliderProvider/types';
import { Slide } from '../Slide/types';

export interface ISliderContext extends Props {
  sliderTrackRef: MutableRefObject<HTMLElement>,
  currentSlideIndex: number,
  setCurrentSlideIndex?: (number) => void // eslint-disable-line no-unused-vars
  scrollRatio: number
  setScrollRatio: (number) => void // eslint-disable-line no-unused-vars
  goToNextSlide: () => void
  goToPrevSlide: () => void
  goToSlideIndex: (number) => void // eslint-disable-line no-unused-vars
  slides: Slide[]
  dispatchSlide: (slide: Slide) => void // eslint-disable-line no-unused-vars
  slideWidth?: string
  isPaused?: boolean
  setIsPaused: (boolean) => void // eslint-disable-line no-unused-vars
}
