export interface ISlide {
  isIntersecting: boolean,
  width: number,
  height: number
}

export type Props = {
  index: number,
  htmlElement?: string,
  htmlAttributes?: Record<string, unknown>
  style?: Record<string, unknown>
}
