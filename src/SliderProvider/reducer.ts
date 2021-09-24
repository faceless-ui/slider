import { Slide } from '../Slide/types';

const reducer = (state: Slide[], payload: Slide): Slide[] => {
  const newState = [...state];
  const { index } = payload;
  newState[index] = payload;
  return newState;
};

export default reducer;
