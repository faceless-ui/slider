import { createContext } from 'react';
import { MutableRefObject } from 'react';
import { ISlide } from '../Slide';
import { SliderProviderProps } from '../SliderProvider';

export interface ISliderContext extends Omit<SliderProviderProps, 'children'> {
  slidesToShow: number // NOTE: this is made required, the provider sets fallback if undefined in incoming props
  scrollOffset: number // NOTE: this is made required, the provider sets fallback if undefined in incoming props
  sliderTrackRef: MutableRefObject<HTMLElement | null>,
  currentSlideIndex: number,
  setCurrentSlideIndex?: (index: number) => void // eslint-disable-line no-unused-vars
  scrollRatio: number
  setScrollRatio: (ratio: number) => void // eslint-disable-line no-unused-vars
  goToNextSlide: () => void
  goToPrevSlide: () => void
  goToSlideIndex: (index: number) => void // eslint-disable-line no-unused-vars
  slides: ISlide[]
  dispatchSlide: (slide: ISlide) => void // eslint-disable-line no-unused-vars
  slideWidth?: string
  isPaused?: boolean
  setIsPaused: (is: boolean) => void // eslint-disable-line no-unused-vars
  isDragging: boolean
  marquee: boolean
}

export const SliderContext = createContext<ISliderContext>({} as ISliderContext);

export default SliderContext;
