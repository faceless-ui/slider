export type Settings = Record<string, unknown>;

export interface IReducerAction {
  payload: Record<string, unknown>
}

export type Props = {
  dispatchSettings: (args: IReducerAction) => void,
}
