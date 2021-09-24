import React, { Fragment } from 'react';
import {
  SliderProvider,
  Slide,
  SliderNav,
  SliderProgress,
  SliderTrack,
} from '../../src'; // swap '../src' for '../dist/build.bundle' to demo production build

const ScrollSnapSliderDemo: React.FC = () => (
  <Fragment>
    <code>
      <pre>
        slidesToShow: 1
        <br />
        useScrollSnap: true
      </pre>
    </code>
    <SliderProvider
      slidesToShow={1}
      useScrollSnap
    >
      <SliderNav
        prevButtonProps={{
          children: (<div>prev</div>),
        }}
        nextButtonProps={{
          children: (<div>next</div>),
        }}
        htmlAttributes={{
          style: {
            display: 'flex',
          },
        }}
      />
      <SliderTrack
        htmlAttributes={{
          style: {
            display: 'flex',
            alignItems: 'center',
            height: '400px',
          },
        }}
      >
        <Slide
          index={0}
          htmlAttributes={{
            style: {
              height: '100%',
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          <div>
            Slide 1
          </div>
        </Slide>
        <Slide
          index={1}
          htmlAttributes={{
            style: {
              height: '100%',
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <div>
            Slide 2
          </div>
        </Slide>
        <Slide
          index={2}
          htmlAttributes={{
            style: {
              height: '100%',
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          <div>
            Slide 3
          </div>
        </Slide>
      </SliderTrack>
      <SliderProgress
        htmlAttributes={{
          style: {
            height: '8px',
            marginTop: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        }}
        indicator={{
          htmlAttributes: {
            style: {
              backgroundColor: 'black',
            },
          },
        }}
      />
    </SliderProvider>
  </Fragment>
);

export default ScrollSnapSliderDemo;
