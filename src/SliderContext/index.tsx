import { createContext } from 'react';
import { ISliderContext } from './types';

export const SliderContext = createContext<ISliderContext>({} as ISliderContext);

export default SliderContext;
