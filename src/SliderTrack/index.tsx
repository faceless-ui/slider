import React, { useEffect } from 'react';
import useSlider from '../useSlider';
import { Props } from './types';

const SliderTrack: React.FC<Props> = (props) => {
  const {
    id,
    className,
    htmlElement = 'div',
    children,
    htmlAttributes = {},
  } = props;

  const {
    sliderTrackRef,
    setScrollRatio,
  } = useSlider();

  useEffect(() => {
    let eventListener;

    const track = sliderTrackRef.current;

    if (sliderTrackRef) {
      let timeout;

      eventListener = () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
          const newScrollRatio = track.scrollLeft / (track.scrollWidth - track.clientWidth);
          setScrollRatio(newScrollRatio);
        });
      };

      track.addEventListener('scroll', eventListener, false);
    }

    return () => {
      if (track) {
        track.removeEventListener('scroll', eventListener);
      }
    };
  }, [setScrollRatio, sliderTrackRef]);

  const Tag = htmlElement as React.ElementType;

  return (
    <Tag
      {...{
        id,
        className,
        ...htmlAttributes,
        style: {
          overflowX: 'scroll', // 'overflow: touch' does not work when 'auto'
          WebkitOverflowScrolling: 'touch',
          ...htmlAttributes.style,
        },
        ref: sliderTrackRef,
      }}
    >
      {children && children}
    </Tag>
  );
};

export default SliderTrack;
