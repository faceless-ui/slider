import {
  CSSProperties,
  ElementType,
  MutableRefObject,
} from 'react';

export interface Slide {
  index: number
  ref: MutableRefObject<HTMLElement>
  isIntersecting: boolean
}

export type Props = {
  index: number,
  id?: string,
  className?: string,
  htmlElement?: ElementType,
  htmlAttributes?: {
    [key: string]: unknown,
    style?: CSSProperties
  },
  slideToSelfOnClick?: boolean
}
