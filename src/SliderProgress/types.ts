import { CSSProperties, ElementType } from 'react';

export type Props = {
  id?: string,
  className?: string,
  style?: CSSProperties,
  htmlElement?: ElementType,
  htmlAttributes?: {
    [key: string]: unknown,
    style?: CSSProperties
  }
  nestedHTMLElement?: ElementType,
  nestedHTMLAttributes?: {
    [key: string]: unknown,
    style?: CSSProperties
  }
}
