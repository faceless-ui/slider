import React from 'react';
import BasicSliderDemo from './BasicSliderDemo';
import ThumbnailSliderDemo from './ThumbnailSliderDemo';
import ScrollSnapSliderDemo from './ScrollSnapSliderDemo';

const App: React.FC = () => (
  <div
    style={{
      maxWidth: '1400px',
      margin: 'auto',
    }}
  >
    <h1>
      Basic Slider:
    </h1>
    <BasicSliderDemo />
    <h1>
      Scroll Snap Slider:
    </h1>
    <ScrollSnapSliderDemo />
    <h1>
      Thumbnail Slider Demo:
    </h1>
    <ThumbnailSliderDemo />
  </div>
);

export default App;
