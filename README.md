[![NPM](https://img.shields.io/npm/v/@faceless-ui/slider)](https://www.npmjs.com/@faceless-ui/slider)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/@faceless-ui/slider?label=zipped)
[![Supported by TRBL](https://img.shields.io/badge/supported_by-TRBL-black)](https://github.com/trouble)

# React Slider

# Table of Contents
  - [Installation](#installation)
  - [Basic Setup](#basic-setup)
  - [API](#api)
  - [Demo](#demo)
  - [Contribution](#contribution)

## Quick Start

### Installation

```bash
$ npm i @faceless-ui/slider
$ # or
$ yarn add @faceless-ui/slider
```

### Basic Setup

```jsx
import React from 'react';
import {
  Slider,
  SliderTrack,
  Slide,
  SliderNav,
  SliderProgress
} from '@faceless-ui/slider';

const App = () => (
  <Slider>
    <SliderTrack>
      <Slide>
        ...
      </Slide>
    </SliderTrack>
    <SliderNav>
      ...
    </SliderNav>
    <SliderProgress>
      ...
    </SliderProgress>
  <Slider>
);

export default App;
```

## API

  - [Slide](./src/Slide/README.md)
  - [Slider](./src/Slider/README.md)
  - [SliderButton](./src/SliderButton/README.md)
  - [SliderNav](./src/SliderNav/README.md)
  - [SliderProgress](./src/SliderProgress/README.md)
  - [SliderTrack](./src/SliderTrack/README.md)
  - [useSlider](./src/useSlider/README.md)
  - [withSlider](./src/withSlider/README.md)

For working examples, see the [demo app](./demo/App.demo.js).

## Demo

```bash
$ git clone git@github.com:faceless-ui/slider.git
$ yarn
$ yarn dev
$ open http://localhost:3000
```

## Contribution

[Help us,](https://github.com/faceless-ui/.github/blob/master/CONTRIBUTING.md) or let us [help you help us](https://github.com/faceless-ui/.github/blob/master/SUPPORT.md).

## License

[MIT](https://github.com/faceless-ui/slider/blob/master/LICENSE) Copyright (c) TRBL, LLC
