import { useEffect, useState } from 'react';

import { pokemonService } from '../pokemonService';
import { Pokemon, PokemonDetails } from '../pokemonTypes';

export function usePokemonDetailsData(id: Pokemon['id']) {
  const [pokemonDetailsData, setPokemonDetailsData] = useState<PokemonDetails>(
    {} as PokemonDetails,
  );
  const [errorToFetchPokemonDetailsData, setErrorToFetchPokemonDetailsData] =
    useState<boolean | null>(null);
  const [loadingPokemonDetailsData, setLoadingPokemonDetailsData] =
    useState(false);

  async function fetchDetailsPokemonData() {
    try {
      setLoadingPokemonDetailsData(true);
      setErrorToFetchPokemonDetailsData(null);
      const pokemonsData = await pokemonService.getDetailsOfPokemons(id);

      setPokemonDetailsData(pokemonsData);
    } catch (e) {
      setErrorToFetchPokemonDetailsData(true);
    } finally {
      setLoadingPokemonDetailsData(false);
    }
  }

  useEffect(() => {
    fetchDetailsPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pokemonDetailsData,
    errorToFetchPokemonDetailsData,
    loadingPokemonDetailsData,
  };
}
