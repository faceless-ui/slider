import { ISlide } from '../Slide';

type SliderState = {
  currentSlideIndex: number
  selectedSlideIndex?: number
  slides: ISlide[]
  scrollIndex?: number
}

const reducer = (
  state: SliderState,
  action: {
    type: string,
    payload?: {
      slide?: ISlide
      [key: string]: unknown
    },
  },
): SliderState => {
  const newState = { ...state };

  const {
    currentSlideIndex,
    selectedSlideIndex,
    slides,
  } = state;

  const {
    type,
    payload = {},
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

    case 'GO_TO_NEXT_SLIDE': {
      const { loop } = payload;

      const indexToUse = selectedSlideIndex || currentSlideIndex;
      const hasNextIndex = indexToUse + 1 < slides.length;
      const nextIndex = hasNextIndex ? indexToUse + 1 : undefined;

      let newSlideIndex;
      if (typeof nextIndex === 'number') {
        newSlideIndex = nextIndex;
      } else if (loop) {
        newSlideIndex = 0; // to first
      }

      newState.scrollIndex = newSlideIndex;

      break;
    }

    case 'GO_TO_PREV_SLIDE': {
      const { loop } = payload;
      const indexToUse = selectedSlideIndex || currentSlideIndex;
      const hasPrev = indexToUse - 1 >= 0;
      const prevIndex = hasPrev ? currentSlideIndex - 1 : undefined;

      let newSlideIndex;
      if (typeof prevIndex === 'number') {
        newSlideIndex = prevIndex;
      } else if (loop) {
        newSlideIndex = slides.length - 1; // to last
      }

      newState.scrollIndex = newSlideIndex;

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

export default reducer;
