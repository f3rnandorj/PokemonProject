import { useEffect, useState } from 'react';

import { pokemonService } from '../pokemonService';
import { Pokemon } from '../pokemonTypes';

export function usePokemonNamesData() {
  const [pokemonNamesData, setPokemonNamesData] = useState<Pokemon['name'][]>(
    [],
  );
  const [errorToFetchPokemonData, setErrorToFetchPokemonData] = useState<
    boolean | null
  >(null);
  const [loadingPokemonNameData, setLoadingPokemonNameData] = useState(false);

  async function fetchInitialData() {
    try {
      setErrorToFetchPokemonData(null);

      setLoadingPokemonNameData(true);

      const data = await pokemonService.getListOfAllPokemonNames();

      setPokemonNamesData(data);
    } catch (e) {
      setErrorToFetchPokemonData(true);
    } finally {
      setLoadingPokemonNameData(false);
    }
  }

  useEffect(() => {
    fetchInitialData();
    console.log(pokemonNamesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pokemonNamesData,
    errorToFetchPokemonData,
    loadingPokemonNameData,
  };
}
