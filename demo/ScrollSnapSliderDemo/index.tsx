import React, { Fragment, useState } from 'react';
import {
  SliderProvider,
  Slide,
  SliderNav,
  SliderProgress,
  SliderTrack,
} from '@faceless-ui/slider';

const ScrollSnapSliderDemo: React.FC = () => {
  const [autoPlay, setAutoplay] = useState(true);
  return (
    <Fragment>
      <code>
        <pre>
          slidesToShow: 1
          <br />
          {`autoPlay: ${autoPlay}`}
        </pre>
      </code>
      <button
        onClick={() => {
          setAutoplay(!autoPlay);
        }}
        type="button"
      >
        {`Autoplay: ${autoPlay}`}
      </button>
      <SliderProvider
        slidesToShow={1}
        autoPlay
        scrollSnap
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
};

export default ScrollSnapSliderDemo;
