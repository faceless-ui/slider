import React from 'react';
import { Props } from './types';
import useSlider from '../useSlider';

const SliderProgress: React.FC<Props> = (props) => {
  const {
    htmlElement = 'div',
    htmlAttributes = {},
    nestedHTMLElement = 'div',
    nestedHTMLAttributes = {},
  } = props;

  const {
    scrollRatio,
    slides,
  } = useSlider();

  const Tag = htmlElement as React.ElementType;
  const NestedTag = nestedHTMLElement as React.ElementType;

  const segmentWidth = 1 / slides.length;

  return (
    <Tag
      {...htmlAttributes}
      style={{
        ...htmlAttributes.style || {},
        position: 'relative',
      }}
    >
      <NestedTag
        {...nestedHTMLAttributes}
        style={{
          ...nestedHTMLAttributes.style || {},
          position: 'absolute',
          top: 0,
          height: '100%',
          width: `${segmentWidth}%`,
          left: `${(scrollRatio * 100) - (scrollRatio * segmentWidth)}% `,
        }}
      />
    </Tag>
  );
};

export default SliderProgress;
