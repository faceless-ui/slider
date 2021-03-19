import React from 'react';
import BasicSliderDemo from './BasicSliderDemo';
import ThumbnailSliderDemo from './ThumbnailSliderDemo';

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
      Thumbnail Slider Demo:
    </h1>
    <ThumbnailSliderDemo />
  </div>
);

export default App;
