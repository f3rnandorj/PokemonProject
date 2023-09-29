import { Pokemon, PokemonDetails } from '@domain';

// export type FavoritePokemon = Pokemon | PokemonDetails | null;

export interface FavoritePokemonsService {
  favoritePokemons: Pokemon | null;
  favoritePokemonDetails: PokemonDetails | null;
  saveFavoritePokemonBasic: (pokemon: Pokemon) => Promise<void>;
  removeFavoritePokemonBasic: () => Promise<void>;
  saveFavoritePokemonDetails: (pokemon: PokemonDetails) => Promise<void>;
  removeFavoritePokemonDetails: () => Promise<void>;
  isLoading: boolean;
}
