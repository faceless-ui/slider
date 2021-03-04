import { ISlide } from '../Slide/types';
import { IDispatchSlide } from './types';

const reducer = (state: ISlide[], payload: IDispatchSlide): ISlide[] => {
  const newState = [...state];

  const {
    index,
    slide,
  } = payload;

  newState[index] = slide;

  return newState;
};

export default reducer;
