import React, { ElementType } from 'react';
import { Props as SliderButton } from '../SliderButton/types';

export type Props = {
  id?: string,
  className?: string,
  htmlElement?: ElementType,
  htmlAttributes?: {
    [key: string]: unknown
  },
  prevButtonProps?: SliderButton,
  nextButtonProps?: SliderButton,
  counter?: {
    Component?: React.ReactNode
    id?: string,
    className?: string,
    htmlElement?: ElementType,
    htmlAttributes?: {
      [key: string]: unknown
    },
  },
  showCounter?: boolean
}
