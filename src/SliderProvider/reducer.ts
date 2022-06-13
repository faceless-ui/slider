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
      scrollToIndex?: (index: number) => void // eslint-disable-line no-unused-vars
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
      const {
        loop,
        scrollToIndex
      } = payload;

      const currentIndex = selectedSlideIndex || currentSlideIndex;

      const nextIndex = currentIndex + 1;
      const hasNext = nextIndex < slides.length;
      let indexToUse = nextIndex;

      if (!hasNext) {
        if (loop) indexToUse = 0;
        else indexToUse = slides.length - 1;
      }

      if (typeof scrollToIndex === 'function') scrollToIndex(indexToUse);
      newState.scrollIndex = indexToUse;

      break;
    }

    case 'GO_TO_PREV_SLIDE': {
      const {
        loop,
        scrollToIndex
      } = payload;

      const currentIndex = selectedSlideIndex || currentSlideIndex;

      const prevIndex = currentIndex - 1;
      const hasPrev = prevIndex >= 0;
      let indexToUse = prevIndex;

      if (!hasPrev) {
        if (loop) indexToUse = slides.length - 1;
        else indexToUse = 0;
      }

      if (typeof scrollToIndex === 'function') scrollToIndex(indexToUse);
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

export default reducer;
