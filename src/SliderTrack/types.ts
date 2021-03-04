import { CSSProperties, ElementType } from 'react';

export type Props = {
  id?: string,
  className?: string,
  htmlElement?: ElementType,
  style?: CSSProperties,
  htmlAttributes?: {
    [key: string]: unknown,
    style?: CSSProperties
  }
}
