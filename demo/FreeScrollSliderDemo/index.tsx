import React, { Fragment } from 'react';
import {
  SliderProvider,
  Slide,
  SliderNav,
  SliderProgress,
  SliderTrack,
} from '../../src'; // swap '../src' for '../dist/build.bundle' to demo production build

const FreeScrollSliderDemo: React.FC = () => (
  <Fragment>
    <code>
      <pre>
        slidesToShow: 2
        <br />
        useFreeScroll: true
      </pre>
    </code>
    <SliderProvider
      slidesToShow={2}
      useFreeScroll
    >
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          width: '400px',
          height: '400px',
        }}
      >
        <SliderNav
          showCounter
          prevButtonProps={{
            children: (<div>prev</div>),
          }}
          nextButtonProps={{
            children: (<div>next</div>),
          }}
        />
        <SliderTrack
          style={{
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Slide
            index={0}
            style={{
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
          >
            <div>
              Slide 1
            </div>
          </Slide>
          <Slide
            index={1}
            style={{
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <div>
              Slide 2
              <div>
                <a
                  href="https://google.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  This is a link
                </a>
              </div>
            </div>
          </Slide>
          <Slide
            index={2}
            style={{
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
          >
            <div>
              Slide 3
            </div>
          </Slide>
          <Slide
            index={3}
            style={{
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, .1)',
            }}
          >
            <div>
              Slide 4
            </div>
          </Slide>
        </SliderTrack>
        <SliderProgress
          style={{
            height: '8px',
            marginTop: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }}
          indicator={{
            style: {
              backgroundColor: 'black',
            },
          }}
        />
      </div>
    </SliderProvider>
  </Fragment>
);

export default FreeScrollSliderDemo;
