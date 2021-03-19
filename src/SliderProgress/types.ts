import { CSSProperties, ElementType } from 'react';

export type Props = {
  id?: string,
  className?: string,
  htmlElement?: ElementType,
  htmlAttributes?: {
    [key: string]: unknown,
    style?: CSSProperties
  }
  indicator?: {
    id?: string,
    className?: string,
    htmlElement?: ElementType,
    htmlAttributes?: {
      [key: string]: unknown,
      style?: CSSProperties
    },
  },
  indicatorType?: 'width' | 'position'
}
