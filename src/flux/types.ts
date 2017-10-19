type RIVERSIDE_LEFT_TYPE = 'left';
type RIVERSIDE_RIGHT_TYPE = 'right';
type BOAT_TYPE = 'boat';

export const RIVERSIDE_LEFT: RIVERSIDE_LEFT_TYPE = 'left';
export const RIVERSIDE_RIGHT: RIVERSIDE_RIGHT_TYPE = 'right';
export const BOAT: BOAT_TYPE = 'boat';

export interface IMessageState {
    content: string;
    hidden: boolean;
}

export interface IGameState {
    currentGame: string;
    finished: boolean;
    list: string[];
}

export interface ISettingsState {
    volume: number;
}

// https://github.com/Microsoft/TypeScript/issues/5579
export interface ICollocationState {
    left: string[];
    right: string[];
    boat: string[];
    boatPosition: RIVERSIDE_LEFT_TYPE | RIVERSIDE_RIGHT_TYPE;
    isBoatInvalid: boolean;
}
