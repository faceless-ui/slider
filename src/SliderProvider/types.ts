import { ISlide } from '../Slide/types';

export interface IDispatchSlide {
  index: number,
  slide: ISlide
}

export type Props = {
  currentSlideIndex?: number,
  onSlide?: (number) => void,
  slidesToShow?: number,
  slideOnSelect?: boolean
}
