import React from 'react';
import ResponsiveSlider from './ResponsiveSlider';
// import MarqueeSliderDemo from './MarqueeSliderDemo';
// import FreeScrollSliderDemo from './FreeScrollSliderDemo';
// import ThumbnailSliderDemo from './ThumbnailSliderDemo';
// import ScrollSnapSliderDemo from './ScrollSnapSliderDemo';

const App: React.FC = () => (
  <div
    style={{
      maxWidth: '1400px',
      margin: 'auto',
    }}
  >
    {/* <h1>
      Free Scroll Slider:
    </h1> */}
    {/* <FreeScrollSliderDemo /> */}
    <h1>
      Responsive Slider:
    </h1>
    <ResponsiveSlider />
    {/* <h1>
      Scroll Snap Slider:
    </h1>
    <ScrollSnapSliderDemo /> */}
    {/* <h1>
      Thumbnail Slider Demo:
    </h1>
    <ThumbnailSliderDemo /> */}
    {/* <h1>
      Marquee Slider Demo
    </h1>
    <MarqueeSliderDemo /> */}
  </div>
);

export default App;
