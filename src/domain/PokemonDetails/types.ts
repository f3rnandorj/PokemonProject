import { Pokemon } from '../Pokemon/types';

export interface PokemonDetails {
  details: {
    description: string;
    weight: number;
    height: number;
    principalMove: string;
    characteristics: {
      gender: {
        masc: number;
        fem: number;
      };
      health: number;
      attack: number;
      defense: number;
      atkSpeed: number;
      defSpeed: number;
      speed: number;
      total: number;
    };
    effectiveness: string;
  } & Pokemon;
}
