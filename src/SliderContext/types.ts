import { IDispatchSlide, Props } from '../SliderProvider/types';
import { ISlide } from '../Slide/types';

export interface ISliderContext extends Props {
  sliderTrackRef: {
    current: Element
  },
  currentSlideIndex: number,
  setCurrentSlideIndex?: (number) => void,
  scrollRatio: number,
  setScrollRatio: (number) => void,
  goToNextSlide: () => void,
  goToPrevSlide: () => void,
  goToSlideIndex: (number) => void,
  slides: ISlide[],
  dispatchSlide: (dispatch: IDispatchSlide) => void,
  slideWidth?: string,
}
