import { useEffect, useState } from 'react';

import { pokemonService } from '../pokemonService';
import { Pokemon } from '../pokemonTypes';

export function usePokemonData() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [errorToFetchPokemonData, setErrorToFetchPokemonData] = useState<
    boolean | null
  >(null);
  const [loadingPokemonData, setLoadingPokemonData] = useState(false);

  async function fetchInitialData() {
    try {
      setErrorToFetchPokemonData(null);
      setLoadingPokemonData(true);
      const pokemonsData = await pokemonService.getListOfPokemons();

      setPokemonData(pokemonsData);
    } catch (e) {
      setErrorToFetchPokemonData(true);
    } finally {
      setLoadingPokemonData(false);
    }
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  return {
    pokemonData,
    errorToFetchPokemonData,
    loadingPokemonData,
  };
}
