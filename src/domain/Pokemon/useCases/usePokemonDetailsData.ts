import { useEffect, useState } from 'react';

import { pokemonService } from '../pokemonService';
import { Pokemon, PokemonDetails, PokemonEvolutions } from '../pokemonTypes';

export function usePokemonDetailsData(id: Pokemon['id']) {
  const [pokemonDetailsData, setPokemonDetailsData] = useState<PokemonDetails>(
    {} as PokemonDetails,
  );
  const [pokemonEvolutions, setPokemonEvolutions] = useState<PokemonEvolutions>(
    {} as PokemonEvolutions,
  );
  const [errorToFetchPokemonDetailsData, setErrorToFetchPokemonDetailsData] =
    useState<boolean | null>(null);
  const [loadingPokemonDetailsData, setLoadingPokemonDetailsData] =
    useState(false);

  async function fetchPokemonDetailsData() {
    try {
      setLoadingPokemonDetailsData(true);
      setErrorToFetchPokemonDetailsData(null);
      const { pokemonInfoDetails, pokemonEvolutionDetails } =
        await pokemonService.getDetailsOfPokemons(id);

      setPokemonDetailsData(pokemonInfoDetails);

      if (pokemonEvolutionDetails) {
        setPokemonEvolutions(pokemonEvolutionDetails);
      }
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
    pokemonEvolutions,
  };
}
