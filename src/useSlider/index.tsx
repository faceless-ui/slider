import { useContext } from 'react';
import SliderContext from '../SliderProvider/context';
import { ISliderContext } from '../SliderProvider/context';

const useSlider = (): ISliderContext => useContext(SliderContext);

export default useSlider;
