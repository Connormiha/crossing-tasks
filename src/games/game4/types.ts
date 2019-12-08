import {ICharactersList, ICharacterBase} from 'flux/types';

export type ICharacterIdGame4 = 'men_black' | 'boy_red' | 'boy_yellow' | 'woman_black' | 'girl_red' | 'girl_yellow' | 'criminal' | 'policeman';
export interface ICharacterGame4 extends ICharacterBase<ICharacterIdGame4> {
    name: string;
    adult: boolean;
};

export type ICharactersListGame3 = ICharactersList<ICharacterGame4>;
