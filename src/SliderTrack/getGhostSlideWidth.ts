import { ISliderContext } from "../SliderProvider/context";

export type GetGhostSlideWidth = (sliderContext: ISliderContext) => string; // eslint-disable-line no-unused-vars

export const getGhostSlideWidth: GetGhostSlideWidth = (sliderContext) => {
  const {
    alignLastSlide,
    slidesToShow,
    slideWidth,
    scrollOffset
  } = sliderContext;

  let ghostSlideWidth = '';

  if (alignLastSlide !== undefined) {
    // NOTE: support arbitrary number value to use as the last slide, negative values being from track-right
    if (typeof alignLastSlide === 'number') {
      if (alignLastSlide < 0) {
        ghostSlideWidth = `${alignLastSlide * -1}px`;
      }
      if (alignLastSlide > 0) {
        ghostSlideWidth = `calc((${slideWidth} * ${slidesToShow - 1}) - ${alignLastSlide}px)`;
      }
    }

    if (typeof alignLastSlide === 'string') {
      switch (alignLastSlide) {
        case 'trackLeft': {
          ghostSlideWidth = `calc(${slideWidth} * ${slidesToShow - 1})`;
          break;
        }
        case 'offsetLeft': {
          ghostSlideWidth = `calc((${slideWidth} * ${slidesToShow - 1}) - ${scrollOffset}px)`;
          break;
        }
        default: {
          // NOTE: this is is similar to how the "number" type works, but with css strings instead
          // first, we need to determine if the first character is a dash, which would indicate a negative value and begin from track-right
          // then we use the value directly in our CSS string
          const alignmentAsNumber = Number.parseInt(alignLastSlide, 10);
          if (alignmentAsNumber < 0) {
            ghostSlideWidth = `${alignmentAsNumber * -1}px`;
          }
          if (alignmentAsNumber > 0) {
            ghostSlideWidth = `calc((${slideWidth} * ${slidesToShow - 1}) - ${alignLastSlide})`;
          }
          break;
        }
      }
    }
  }

  return ghostSlideWidth;
}
