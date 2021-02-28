import React from 'react';

export type Props = {
  Prev: React.ReactNode,
  Next: React.ReactNode,
  htmlElement?: string,
  htmlAttributes?: Record<string, unknown>,
  showCounter?: boolean
}
