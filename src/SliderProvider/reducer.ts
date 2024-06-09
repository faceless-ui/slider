import type { ISlide } from '../Slide/index.js';

export type SliderState = {
  currentSlideIndex: number
  selectedSlideIndex?: number
  slides: ISlide[]
  scrollIndex?: number
}

export type UPDATE_SLIDE = {
  type: 'UPDATE_SLIDE'
  payload: {
    slide?: ISlide
  }
}

export type GO_TO_SLIDE_INDEX = {
  type: 'GO_TO_SLIDE_INDEX'
  payload: {
    index?: number
  }
}

export type GO_TO_PREV_SLIDE = {
  type: 'GO_TO_PREV_SLIDE'
  payload: {
    loop?: boolean
  }
}

export type GO_TO_NEXT_SLIDE = {
  type: 'GO_TO_NEXT_SLIDE'
  payload: {
    loop?: boolean
    isFullyScrolled?: boolean
  }
}

export type Action = GO_TO_PREV_SLIDE
  | UPDATE_SLIDE
  | GO_TO_SLIDE_INDEX
  | GO_TO_NEXT_SLIDE

export const reducer = (
  state: SliderState,
  action: Action,
): SliderState => {
  const newState = { ...state };

  const {
    currentSlideIndex,
    selectedSlideIndex,
    slides,
  } = state;

  const {
    type,
    payload,
  } = action;

  switch (type) {
    case 'UPDATE_SLIDE': {
      const {
        slide,
      } = payload;

      if (slide) {
        const {
          index: slideIndex,
        } = slide;

        newState.slides[slideIndex] = slide;
      }
      break;
    }

    case 'GO_TO_SLIDE_INDEX': {
      const {
        index,
      } = payload;

      if (typeof index === 'number') {
        newState.scrollIndex = index;
      }

      break;
    }

    case 'GO_TO_NEXT_SLIDE': {
      const {
        loop,
        isFullyScrolled
      } = payload;

      const currentIndex = selectedSlideIndex || currentSlideIndex;

      const nextIndex = currentIndex + 1;
      const hasNext = nextIndex < slides.length;
      let indexToUse = nextIndex;

      if (!hasNext || isFullyScrolled) {
        if (loop) indexToUse = 0; // first slide
        else indexToUse = slides.length - 1; // last slide
      }

      newState.scrollIndex = indexToUse;

      break;
    }

    case 'GO_TO_PREV_SLIDE': {
      const {
        loop,
      } = payload;

      const currentIndex = selectedSlideIndex || currentSlideIndex;

      const prevIndex = currentIndex - 1;
      const hasPrev = prevIndex >= 0;
      let indexToUse = prevIndex;

      if (!hasPrev) {
        if (loop) indexToUse = slides.length - 1;
        else indexToUse = 0;
      }

      newState.scrollIndex = indexToUse;

      break;
    }

    default: {
      break;
    }
  }

  const allIntersections = state?.slides.map(({ isIntersecting }) => isIntersecting);
  let newSlideIndex = allIntersections.indexOf(true); // first intersecting slide
  if (newSlideIndex === -1) newSlideIndex = 0; // if none intersection, use first slide
  newState.currentSlideIndex = newSlideIndex;

  return newState;
};
