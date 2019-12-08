import {ICharactersList, ICharacterBase} from 'flux/types';

export type ICharacterIdGame2 = 'caveman_1' | 'caveman_2' | 'caveman_3' | 'priest_1' | 'priest_2' | 'priest_3';
export interface ICharacterGame2 extends ICharacterBase<ICharacterIdGame2> {
    name: string;
    type: string;
};
export type ICharactersListGame2 = ICharactersList<ICharacterGame2>;
