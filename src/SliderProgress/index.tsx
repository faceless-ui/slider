import React, {
  useEffect,
  useState,
} from 'react';
import useSlider from '../useSlider';

export type Props = {
  id?: string,
  className?: string,
  htmlElement?: React.ElementType,
  htmlAttributes?: {
    [key: string]: unknown,
    style?: React.CSSProperties
  }
  indicator?: {
    id?: string,
    className?: string,
    htmlElement?: React.ElementType,
    htmlAttributes?: {
      [key: string]: unknown,
      style?: React.CSSProperties
    },
  },
  indicatorType?: 'width' | 'position'
}

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
    slidesToShow,
    setIsPaused,
    pauseOnHover,
    scrollOffset,
    sliderTrackRef,
  } = useSlider();

  const Tag = htmlElement as React.ElementType;
  const IndicatorTag = indicatorHTMLElement as React.ElementType;

  useEffect(() => {
    const newSegmentStyle = {
      width: '',
      left: '',
    };

    const { current: track } = sliderTrackRef;

    if (track) {
      const trackWidth = track.offsetWidth;
      const scrollOffsetRatio = scrollOffset > 0 ? ((trackWidth / scrollOffset) / 100) : 0;

      const segmentWidth = (1 / slides.length) / (1 / slidesToShow) - scrollOffsetRatio;

      if (indicatorType === 'position') {
        newSegmentStyle.width = `${segmentWidth * 100}%`;
        newSegmentStyle.left = `${(scrollRatio - (scrollRatio * segmentWidth)) * 100}%`;
      }

      if (indicatorType === 'width') {
        newSegmentStyle.width = `${scrollRatio * 100}%`;
        newSegmentStyle.left = '0px';
      }

      setSegmentStyle(newSegmentStyle);
    }
  }, [
    slides.length,
    indicatorType,
    scrollRatio,
    slidesToShow,
    sliderTrackRef,
    scrollOffset,
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
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
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
