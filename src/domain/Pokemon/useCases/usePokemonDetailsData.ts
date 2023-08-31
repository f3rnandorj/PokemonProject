import { useEffect, useState } from 'react';

import { pokemonService } from '../pokemonService';
import { Pokemon, PokemonDetails, PokemonEvolutions } from '../pokemonTypes';

export function usePokemonDetailsData(pokemonName: Pokemon['name']) {
  const [pokemonBasicDetailsData, setPokemonBasicDetailsData] =
    useState<Pokemon>({} as Pokemon);
  const [pokemonDetailsData, setPokemonDetailsData] = useState<PokemonDetails>(
    {} as PokemonDetails,
  );
  const [pokemonEvolutionsData, setPokemonEvolutionsData] =
    useState<PokemonEvolutions>({} as PokemonEvolutions);
  const [errorToFetchPokemonDetailsData, setErrorToFetchPokemonDetailsData] =
    useState<boolean | null>(null);
  const [loadingPokemonDetailsData, setLoadingPokemonDetailsData] =
    useState(false);

  async function fetchEvolutionPokemonDetailsData(name: Pokemon['name']) {
    try {
      setLoadingPokemonDetailsData(true);
      setErrorToFetchPokemonDetailsData(null);

      const {
        pokemonBasicDetails,
        pokemonInfoDetails,
        pokemonEvolutionDetails,
      } = await pokemonService.getDetailsOfPokemons(name);

      setPokemonBasicDetailsData(pokemonBasicDetails!);
      setPokemonDetailsData(pokemonInfoDetails);
      setPokemonEvolutionsData(pokemonEvolutionDetails);
    } catch (e) {
      setErrorToFetchPokemonDetailsData(true);
    } finally {
      setLoadingPokemonDetailsData(false);
    }
  }

  useEffect(() => {
    if (pokemonName !== '') {
      fetchEvolutionPokemonDetailsData(pokemonName);
    }
  }, [pokemonName]);

  return {
    errorToFetchPokemonDetailsData,
    loadingPokemonDetailsData,
    pokemonBasicDetailsData,
    pokemonDetailsData,
    pokemonEvolutionsData,
    fetchEvolutionPokemonDetailsData,
  };
}
