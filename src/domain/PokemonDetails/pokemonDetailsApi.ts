import { pokemonDetailsDataMock } from './pokemonDetailsDataMock';
import { PokemonDetails } from './types';

async function getList(): Promise<PokemonDetails> {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, 1000);
  });

  return pokemonDetailsDataMock;
}

export const pokemonDetailsApi = {
  getList,
};
