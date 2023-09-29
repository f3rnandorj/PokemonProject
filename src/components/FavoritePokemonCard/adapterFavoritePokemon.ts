import { Pokemon, PokemonDetails } from '@domain';
import { FavoritePokemon } from '@services';

interface FavoritePokemonDetails {
  pokemonBasicDetailsData: Pokemon;
  pokemonDetailsData: PokemonDetails;
}

function toPokemonDetails(pokemon: FavoritePokemon): FavoritePokemonDetails {
  return {
    pokemonBasicDetailsData: {
      id: pokemon.id,
      avatarURL: pokemon.avatarURL,
      characteristics: pokemon.characteristics,
      effectiveness: pokemon.effectiveness,
      height: pokemon.height,
      name: pokemon.name,
      principalMove: pokemon.principalMove,
      types: pokemon.types,
      weight: pokemon.weight,
    },
    pokemonDetailsData: {
      captureRate: pokemon.captureRate,
      characteristicsGender: pokemon.characteristicsGender,
      description: pokemon.description,
    },
  };
}

export const objectPokemonAdapter = {
  toPokemonDetails,
};
