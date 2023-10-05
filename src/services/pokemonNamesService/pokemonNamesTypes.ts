export interface PokemonNamesService {
  pokemonNamesList: string[] | undefined;
  isError: boolean | null;
  isLoading: boolean;
  refetch: () => void;
}
