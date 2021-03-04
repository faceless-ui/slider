import { IDispatchSlide, Props } from '../SliderProvider/types';
import { ISlide } from '../Slide/types';

export interface ISliderContext extends Props {
  sliderTrackRef: {
    current: Element
  },
  currentSlideIndex: number,
  scrollRatio: number,
  setScrollRatio: (number) => void,
  nextSlide: () => void,
  prevSlide: () => void,
  slides: ISlide[],
  dispatchSlide: (dispatch: IDispatchSlide) => void
}
