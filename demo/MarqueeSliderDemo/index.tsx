import React, { Fragment } from 'react';
import {
  SliderProvider,
  Slide,
  SliderTrack,
} from '@faceless-ui/slider';

const MarqueeSliderDemo: React.FC = () => (
  <Fragment>
    <code>
      <pre>
        slidesToShow: 2
        <br />
        scrollable: true
      </pre>
    </code>
    <SliderProvider
      slidesToShow={2}
      marquee
    // marqueeSpeed={100}
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
          <Slide
            index={4}
            style={{
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, .1)',
            }}
          >
            <div>
              Slide 5
            </div>
          </Slide>
          <Slide
            index={5}
            style={{
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, .1)',
            }}
          >
            <div>
              Slide 6
            </div>
          </Slide>
        </SliderTrack>
      </div>
    </SliderProvider>
  </Fragment>
);

export default MarqueeSliderDemo;
