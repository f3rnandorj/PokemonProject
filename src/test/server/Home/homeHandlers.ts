import { http, HttpResponse } from 'msw';

import { BASE_URL, PageApi } from '@api';
import { PokemonApi, PokemonNameDataApi } from '@domain';

import { mockedPokemonListData } from './mocks';

export const homeHandlers = [
  http.get(`${BASE_URL}/pokemon`, async () => {
    const response: PageApi<PokemonNameDataApi> =
      mockedPokemonListData.mockedPokemonNameDataApi;

    return HttpResponse.json(response, { status: 200 });
  }),
  http.get(`${BASE_URL}/pokemon/:pokemon`, async () => {
    const response: PokemonApi = mockedPokemonListData.mockedDataPokemonApi;

    return HttpResponse.json(response, { status: 200 });
  }),
];
