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

      const indexToUse = selectedSlideIndex || currentSlideIndex;
      const hasNext = indexToUse + 1 < slides.length;
      const lastIndex = slides.length - 1;
      const nextIndex = hasNext ? indexToUse + 1 : lastIndex;
      const newSlideIndex = loop ? 0 : nextIndex;

      if (typeof scrollToIndex === 'function') scrollToIndex(newSlideIndex);
      newState.scrollIndex = newSlideIndex;

      break;
    }

    case 'GO_TO_PREV_SLIDE': {
      const {
        loop,
        scrollToIndex
      } = payload;

      const indexToUse = selectedSlideIndex || currentSlideIndex;
      const hasPrev = indexToUse - 1 >= 0;
      const prevIndex = hasPrev ? currentSlideIndex - 1 : 0;
      const lastIndex = slides.length - 1;
      const newSlideIndex = loop ? lastIndex : prevIndex;

      if (typeof scrollToIndex === 'function') scrollToIndex(newSlideIndex);
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
