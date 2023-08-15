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

  async function fetchPokemonDetailsData() {
    try {
      setLoadingPokemonDetailsData(true);
      setErrorToFetchPokemonDetailsData(null);
      const { pokemonInfoDetails } = await pokemonService.getDetailsOfPokemons(
        id,
      );

      setPokemonDetailsData(pokemonInfoDetails);
    } catch (e) {
      setErrorToFetchPokemonDetailsData(true);
    } finally {
      setLoadingPokemonDetailsData(false);
    }
  }

  useEffect(() => {
    fetchPokemonDetailsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pokemonDetailsData,
    errorToFetchPokemonDetailsData,
    loadingPokemonDetailsData,
  };
}
