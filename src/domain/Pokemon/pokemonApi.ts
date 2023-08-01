import { pokemonDataMock } from './pokemonDataMock';
import { Pokemon } from './types';

async function getListOfPokemon(): Promise<Pokemon[]> {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, 1000);
  });

  return pokemonDataMock;
}

export const pokemonApi = {
  getListOfPokemon,
};
