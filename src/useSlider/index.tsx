import { useContext } from 'react';
import { SliderContext } from '../SliderProvider/context.js';
import { ISliderContext } from '../SliderProvider/context.js';

export const useSlider = (): ISliderContext => useContext(SliderContext);
