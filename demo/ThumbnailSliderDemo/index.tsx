import React, { useState } from 'react';
import {
  SliderProvider,
  Slide,
  SliderNav,
  SliderProgress,
  SliderTrack,
} from '@faceless-ui/slider';

const ThumbnailSliderDemo: React.FC = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <SliderProvider
        currentSlideIndex={index}
        slidesToShow={1}
      >
        <SliderTrack
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '400px',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          <Slide
            index={0}
            style={{

              height: '100%',
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <div>
              Slide 5
            </div>
          </Slide>
        </SliderTrack>
      </SliderProvider>
      <SliderProvider
        onSlide={(incomingIndex) => {
          setIndex(incomingIndex);
        }}
        slidesToShow={3}
        slideOnSelect
      >
        <SliderNav
          prevButtonProps={{
            children: (<div>prev</div>),
          }}
          nextButtonProps={{
            children: (<div>next</div>),
          }}
          style={{

            display: 'flex',
          }}
        />
        <SliderTrack
          style={{

            display: 'flex',
            alignItems: 'center',
            height: '100px',
            margin: '10px 0',
          }}
        >
          <Slide
            index={0}
            style={{

              height: '100%',
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
              flexShrink: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <div>
              Slide 5
            </div>
          </Slide>
        </SliderTrack>
        <SliderProgress
          indicatorType="width"
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
      </SliderProvider>
    </div>
  );
}

export default ThumbnailSliderDemo;
