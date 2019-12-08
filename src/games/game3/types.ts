import {ICharactersList, ICharacterBase} from 'flux/types';

export type ICharacterIdGame3 = 'women_red' | 'men_red' | 'women_white' | 'men_white' | 'women_black' | 'men_black';
export interface ICharacterGame3 extends ICharacterBase<ICharacterIdGame3> {
    name: string;
    family: 'red' | 'white' | 'black';
    sex: 'male' | 'female';
};

export type ICharactersListGame3 = ICharactersList<ICharacterGame3>;
