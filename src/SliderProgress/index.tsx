import React, {
  useCallback,
  useEffect,
  useRef,
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
    slidesToShow,
    setIsPaused,
    pauseOnHover,
    scrollOffset,
    sliderTrackRef,
  } = useSlider();

  const Tag = htmlElement as React.ElementType;
  const IndicatorTag = indicatorHTMLElement as React.ElementType;

  const indicatorRef = useRef(null);

  useEffect(() => {
    const newSegmentStyle = {
      width: '',
      left: '',
    };

    const { current: track } = sliderTrackRef;
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
  }, [
    slides.length,
    indicatorType,
    scrollRatio,
    slidesToShow,
    sliderTrackRef,
    scrollOffset,
  ]);

  const [state, setState] = useState({
    prevClientX: 0,
    isDragging: false,
  });

  const onMouseDown = useCallback((event) => {
    const indicator = indicatorRef.current;
    if (indicator) {
      setState({
        prevClientX: event.clientX,
        isDragging: true,
      });
    }
  }, []);

  const onMouseMove = useCallback((event) => {
    const {
      prevClientX,
      isDragging,
    } = state;

    if (isDragging) {
      const sliderTrack = sliderTrackRef.current;
      const xDistance = prevClientX + event.clientX;
      const ratioDragged = xDistance / sliderTrack.scrollWidth;
      console.log(ratioDragged);
      const pixelsDragged = sliderTrack.scrollWidth * ratioDragged;
      console.log(pixelsDragged);
      sliderTrackRef.current.scrollLeft = sliderTrack.scrollLeft + (sliderTrack.scrollWidth * ratioDragged);
    }
  }, [
    state,
    sliderTrackRef,
  ]);

  const clearState = useCallback(() => {
    setState({
      prevClientX: 0,
      isDragging: false,
    });
  }, []);

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
        ref={indicatorRef}
        className={indicatorClassName}
        {...indicatorHTMLAttributes}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={clearState}
        onMouseLeave={clearState}
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
