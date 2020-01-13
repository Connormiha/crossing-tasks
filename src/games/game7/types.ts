import {ICharactersList, ICharacterBase} from 'flux/types';

export type ICharacterIdGame7 = 'farmer' | 'cabbage' | 'sheep' | 'wolf1' | 'wolf2' | 'dog';
export interface ICharacterGame7 extends ICharacterBase<ICharacterIdGame7> {
    name: string;
}

export type ICharactersListGame7 = ICharactersList<ICharacterGame7>;
