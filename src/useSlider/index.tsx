import { useContext } from 'react';
import SliderContext from '../SliderContext';
import { ISliderContext } from '../SliderContext/types';

const useSlider = (): ISliderContext => useContext(SliderContext);

export default useSlider;
