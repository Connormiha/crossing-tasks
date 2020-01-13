import {ICharactersList, ICharacterBase} from 'flux/types';

export type ICharacterIdGame1 = 'farmer' | 'wolf' | 'cabbage' | 'sheep';
export interface ICharacterGame1 extends ICharacterBase<ICharacterIdGame1> {
    name: string;
}

export type ICharactersListGame1 = ICharactersList<ICharacterGame1>;
