import { CSSProperties, ElementType } from 'react';

export interface ISlide {
  isIntersecting: boolean,
  width: number,
  height: number
}

export type Props = {
  index: number,
  id?: string,
  className?: string,
  style?: CSSProperties,
  htmlElement?: ElementType,
  htmlAttributes?: {
    [key: string]: unknown
  }
}
