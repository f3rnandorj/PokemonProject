import {
  adapterDescriptionApiReturn,
  calculateGender,
  getPokemonEffectiveness,
  PokemonTypeEnum,
} from '@utils';

import {
  Pokemon,
  PokemonDetailsApi,
  PokemonSpeciesDetailsApi,
} from './pokemonTypes';

export type PokemonDataApi = PokemonDetailsApi & PokemonSpeciesDetailsApi;

function toPokemon(pokemon: PokemonDataApi): Pokemon {
  const health = pokemon.stats[0].base_stat;
  const attack = pokemon.stats[1].base_stat;
  const defense = pokemon.stats[2].base_stat;
  const specialAtk = pokemon.stats[3].base_stat;
  const specialDef = pokemon.stats[4].base_stat;
  const speed = pokemon.stats[5].base_stat;
  const total = health + attack + defense + specialAtk + specialDef + speed;

  const characteristics: Pokemon['characteristics'] = {
    gender: {
      fem: calculateGender(pokemon.gender_rate).fem,
      masc: calculateGender(pokemon.gender_rate).masc,
    },
    health,
    attack,
    defense,
    specialAtk,
    specialDef,
    speed,
    total,
  };

  const types = pokemon.types.map(type => type.type.name) as PokemonTypeEnum[];

  const pokemonEffectiveness = getPokemonEffectiveness(types);

  const description = adapterDescriptionApiReturn(
    pokemon.flavor_text_entries[7].flavor_text,
  );

  return {
    id: String(pokemon.id),
    name: pokemon.name,
    types,
    avatarURL: pokemon.sprites.other['official-artwork'].front_default,
    characteristics,
    description,
    effectiveness: pokemonEffectiveness[0],
    height: pokemon.height,
    principalMove: pokemon.abilities[0].ability.name,
    weight: pokemon.weight,
  };
}

export const pokemonAdapter = {
  toPokemon,
};
