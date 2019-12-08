import {ICharactersList, ICharacterBase} from 'flux/types';

export type ICharacterIdGame5 = 'priest_1' | 'priest_2' | 'priest_3' | 'monkey_1' | 'monkey_2' | 'gorilla';
export interface ICharacterGame5 extends ICharacterBase<ICharacterIdGame5> {
    name: string;
    type: 'monkey' | 'priest';
};

export type ICharactersListGame5 = ICharactersList<ICharacterGame5>;
