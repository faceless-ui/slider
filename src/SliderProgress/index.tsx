import React, {
  HTMLProps,
  useEffect,
  useState,
} from 'react';
import useSlider from '../useSlider';

export interface ProgressIndicatorProps extends HTMLProps<HTMLDivElement> {
  htmlElement?: React.ElementType
}

export interface SliderProgressProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  indicator?: ProgressIndicatorProps
  indicatorType?: 'width' | 'position'
}

const SliderProgress: React.FC<SliderProgressProps> = (props) => {
  const {
    htmlElement: Tag = 'div',
    style,
    indicator: {
      id: indicatorID,
      style: indicatorStyle,
      htmlElement: IndicatorTag = 'div',
      ...indicatorRest
    } = {},
    indicatorType = 'position',
    ...rest
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
      {...rest}
      style={{
        position: 'relative',
        ...style || {},
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
        {...indicatorRest}
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          ...segmentStyle,
          ...indicatorStyle || {},
        }}
      />
    </Tag>
  );
};

export default SliderProgress;
