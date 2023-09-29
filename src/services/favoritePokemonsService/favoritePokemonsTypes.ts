import { Pokemon, PokemonDetails } from '@domain';

// export type FavoritePokemon = Pokemon | PokemonDetails | null;

export interface FavoritePokemonsService {
  allFavoritePokemons: any[] | null;
  favoritePokemons: Pokemon | null;
  favoritePokemonDetails: PokemonDetails | null;
  getAllFavoritePokemons: () => Promise<void>;
  getFavoritePokemonById: (pokemonId: Pokemon['id'] | undefined) => void;
  saveFavoritePokemonBasic: (pokemon: Pokemon) => Promise<void>;
  removeFavoritePokemonBasic: (pokemonId: Pokemon['id']) => Promise<void>;
  saveFavoritePokemonDetails: (
    pokemon: PokemonDetails,
    pokemonId: Pokemon['id'],
  ) => Promise<void>;
  removeFavoritePokemonDetails: (pokemonId: Pokemon['id']) => Promise<void>;
  isLoading: boolean;
}
