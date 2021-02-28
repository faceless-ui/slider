import React from 'react';
import {
  Slider,
  Slide,
  SliderNav,
  SliderProgress,
  SliderTrack,
} from '../../src'; // swap '../src' for '../dist/build.bundle' to demo production build

const App: React.FC = () => (
  <Slider>
    <SliderNav
      Prev={(<div>prev</div>)}
      Next={(<div>next</div>)}
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
            width: '66%',
            height: '100%',
            flexShrink: 0,
            backgroundColor: 'lightgray',
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
            width: '66%',
            height: '100%',
            flexShrink: 0,
            backgroundColor: 'darkgray',
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
            width: '66%',
            height: '100%',
            flexShrink: 0,
            backgroundColor: 'gray',
          },
        }}
      >
        <div>
          Slide 3
        </div>
      </Slide>
    </SliderTrack>
    <SliderProgress />
  </Slider>
);

export default App;
