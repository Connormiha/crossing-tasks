export type RIVERSIDE_LEFT_TYPE = 'left';
export type RIVERSIDE_RIGHT_TYPE = 'right';
export type BOAT_TYPE = 'boat';

export const RIVERSIDE_LEFT: RIVERSIDE_LEFT_TYPE = 'left';
export const RIVERSIDE_RIGHT: RIVERSIDE_RIGHT_TYPE = 'right';
export const BOAT: BOAT_TYPE = 'boat';

export interface IMessageState {
  readonly content: string;
  readonly hidden: boolean;
}

export interface IGameState {
  readonly currentGame: string;
  readonly finished: boolean;
  readonly list: string[];
}

export interface ISettingsState {
  readonly volume: number;
}

export interface ICharacterBase<T extends string> {
  id: T;
  name: string;
}

export type ICharactersMap<T> = T extends ICharacterBase<infer S> ? Record<S, T> : never;
//export type ICharactersList<T> = T extends ICharacterBase<infer S> ? (S extends string ? T[] : never) : never;
export type ICharactersList<T> = T extends ICharacterBase<infer _S> ? T[] : never;

// https://github.com/Microsoft/TypeScript/issues/5579
export interface ICollocationState<T extends string = string> {
  readonly left: T[];
  readonly right: T[];
  readonly boat: T[];
  readonly boatPosition: RIVERSIDE_LEFT_TYPE | RIVERSIDE_RIGHT_TYPE;
  readonly isBoatInvalid: boolean;
}
