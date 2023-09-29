import { Pokemon, PokemonDetails } from '@domain';

export type FavoritePokemon = Pokemon &
  PokemonDetails & {
    isFavorite?: boolean;
  };
export interface FavoritePokemonsService {
  allFavoritePokemons: FavoritePokemon[] | null;
  favoritePokemon: FavoritePokemon | null;
  getAllFavoritePokemons: () => Promise<void>;
  getFavoritePokemonById: (
    pokemonId: FavoritePokemon['id'] | undefined,
  ) => void;
  saveFavoritePokemon: (pokemon: FavoritePokemon) => Promise<void>;
  removeFavoritePokemon: (pokemonId: FavoritePokemon['id']) => Promise<void>;
  isLoading: boolean;
}
