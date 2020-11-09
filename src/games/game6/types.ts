import { ICharactersList, ICharacterBase } from 'flux/types';

export type ICharacterIdGame6 =
  | 'women_red'
  | 'men_red'
  | 'women_white'
  | 'men_white'
  | 'women_black'
  | 'men_black'
  | 'women_blue'
  | 'men_blue';
export interface ICharacterGame6 extends ICharacterBase<ICharacterIdGame6> {
  name: string;
  family: 'white' | 'black' | 'blue' | 'red';
  sex: 'male' | 'female';
}

export type ICharactersListGame6 = ICharactersList<ICharacterGame6>;
