import React, {
  useEffect,
  useState,
} from 'react';
import { Props } from './types';
import useSlider from '../useSlider';

const SliderProgress: React.FC<Props> = (props) => {
  const {
    htmlElement = 'div',
    htmlAttributes = {},
    id,
    className,
    indicator: {
      htmlElement: indicatorHTMLElement = 'div',
      htmlAttributes: indicatorHTMLAttributes = {},
      id: indicatorID,
      className: indicatorClassName,
    } = {},
    indicatorType = 'position',
  } = props;

  const [segmentStyle, setSegmentStyle] = useState({
    width: '',
    left: '',
  });

  const {
    scrollRatio,
    slides,
  } = useSlider();

  const Tag = htmlElement as React.ElementType;
  const IndicatorTag = indicatorHTMLElement as React.ElementType;

  useEffect(() => {
    const newSegmentStyle = {
      width: '',
      left: '',
    };

    if (indicatorType === 'position') {
      newSegmentStyle.width = `${(1 / slides.length) * 100}%`;
      newSegmentStyle.left = `${(scrollRatio - (scrollRatio * (1 / slides.length))) * 100}%`;
    }

    if (indicatorType === 'width') {
      newSegmentStyle.width = `${scrollRatio * 100}%`;
      newSegmentStyle.left = '0px';
    }

    setSegmentStyle(newSegmentStyle);
  }, [
    slides.length,
    indicatorType,
    scrollRatio,
  ]);

  return (
    <Tag
      id={id}
      className={className}
      {...htmlAttributes}
      style={{
        position: 'relative',
        ...htmlAttributes.style || {},
      }}
    >
      <IndicatorTag
        id={indicatorID}
        className={indicatorClassName}
        {...indicatorHTMLAttributes}
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          ...segmentStyle,
          ...indicatorHTMLAttributes.style || {},
        }}
      />
    </Tag>
  );
};

export default SliderProgress;
