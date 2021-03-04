import React, { ElementType } from 'react';

export type Props = {
  Prev: React.ReactNode,
  Next: React.ReactNode,
  id?: string,
  className?: string,
  htmlElement?: ElementType,
  htmlAttributes?: {
    [key: string]: unknown
  },
  showCounter?: boolean
}
