import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  SliderProvider,
  Slide,
  SliderTrack,
} from '../../src'; // swap '../src' for '../dist/build.bundle' to demo production build

// NOTE: this components test both internal breakpoints and external breakpoints

const slides = Array.from(Array(6).keys()); // NOTE: create array from number

const desktopSlidesToShow = 3;

const ResponsiveSlider: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(desktopSlidesToShow);

  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) setSlidesToShow(1)
    else setSlidesToShow(desktopSlidesToShow)
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <Fragment>
      <SliderProvider
        slidesToShow={slidesToShow}
      // slidesToShow={desktopSlidesToShow}
      // breakpoints={{
      //   '(max-width: 768px)': {
      //     slidesToShow: 1,
      //   },
      // }}
      >
        <div
          style={{
            height: '400px',
            width: '400px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SliderTrack>
            {slides.map((slide, index) => (
              <Slide
                key={index}
                index={index}
              >
                <div
                  style={{
                    padding: '50px',
                    backgroundColor: 'gray',
                    border: '1px solid black',
                  }}
                >
                  {`Slide ${index + 1}`}
                </div>
              </Slide>
            ))}
          </SliderTrack>
        </div>
      </SliderProvider>
    </Fragment>
  );
};

export default ResponsiveSlider;
