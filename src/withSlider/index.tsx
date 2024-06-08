import React from 'react';
import { useSlider } from '../useSlider/index.js';

export const withSlider = <P extends Record<string, unknown>>(
  PassedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const SliderContextWrap: React.FC<P> = (props) => {
    const sliderContext = useSlider();

    return (
      <PassedComponent
        {...{
          ...props,
          slider: sliderContext,
        }}
      />
    );
  };

  return SliderContextWrap;
};
