import { PokemonDetails } from '@domain';

import { pokemonDataMock } from './pokemonDataMock';
import { pokemonDetailsDataMock } from './pokemonDetailsDataMock';
import { Pokemon } from './pokemonTypes';

interface ResponseApi {
  pokemonDataMock: Pokemon[];
  pokemonDetailsDataMock: PokemonDetails;
}
async function getList(): Promise<ResponseApi> {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, 1000);
  });

  return { pokemonDataMock, pokemonDetailsDataMock };
}

export const pokemonApi = {
  getList,
};
