import React, { ElementType } from 'react';

export type Props = {
  id?: string,
  className?: string,
  htmlElement?: ElementType,
  htmlAttributes?: {
    [key: string]: unknown
  },
  children?: React.ReactNode,
  direction?: 'prev' | 'next'
}
