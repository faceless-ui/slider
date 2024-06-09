import React, {
  HTMLProps,
  useEffect,
  useState,
} from 'react';
import { useSlider } from '../useSlider/index.js';

export interface ProgressIndicatorProps extends HTMLProps<HTMLDivElement> {
  htmlElement?: React.ElementType
}

export interface SliderProgressProps extends HTMLProps<HTMLElement> {
  htmlElement?: React.ElementType
  indicator?: ProgressIndicatorProps
  indicatorType?: 'width' | 'position'
}

type SegmentStyle = {
  width?: string
  left?: string
}

export const SliderProgress: React.FC<SliderProgressProps> = (props) => {
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

  const [segmentStyle, setSegmentStyle] = useState<SegmentStyle | undefined>(undefined);

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
    let newSegmentStyle: SegmentStyle | undefined;

    const { current: track } = sliderTrackRef;

    if (track) {
      newSegmentStyle = {};
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
          ...segmentStyle || {},
          ...indicatorStyle || {},
        }}
      />
    </Tag>
  );
};
