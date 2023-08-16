import { useEffect, useState } from 'react';

import { pokemonService } from '../pokemonService';
import { Pokemon } from '../pokemonTypes';

export function usePokemonData() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [errorToFetchPokemonData, setErrorToFetchPokemonData] = useState<
    boolean | null
  >(null);
  const [loadingPokemonData, setLoadingPokemonData] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  async function fetchInitialData() {
    try {
      setErrorToFetchPokemonData(null);
      setLoadingPokemonData(true);
      const { data, meta } = await pokemonService.getListOfPokemons(0);

      setPokemonData(data);

      if (meta.next) {
        setPage(1);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setErrorToFetchPokemonData(true);
    } finally {
      setLoadingPokemonData(false);
    }
  }

  async function fetchNextPage() {
    if (loadingPokemonData || !hasNextPage) {
      return;
    }

    try {
      setLoadingPokemonData(true);
      const { data, meta } = await pokemonService.getListOfPokemons(page);

      setPokemonData(prev => [...prev, ...data]);

      if (meta.next) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
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
    fetchNextPage,
  };
}
