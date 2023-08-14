import {
  adapterBodyDetails,
  adapterDescriptionApiReturn,
  calculateGender,
  getPokemonEffectiveness,
  PokemonTypeEnum,
} from '@utils';

import {
  Pokemon,
  PokemonApi,
  PokemonDetails,
  PokemonDetailsApi,
} from './pokemonTypes';

function toPokemon(pokemon: PokemonApi): Pokemon {
  const types = pokemon.types.map(type => type.type.name) as PokemonTypeEnum[];

  const health = pokemon.stats[0].base_stat;
  const attack = pokemon.stats[1].base_stat;
  const defense = pokemon.stats[2].base_stat;
  const specialAtk = pokemon.stats[3].base_stat;
  const specialDef = pokemon.stats[4].base_stat;
  const speed = pokemon.stats[5].base_stat;
  const total = health + attack + defense + specialAtk + specialDef + speed;

  const characteristics: Pokemon['characteristics'] = {
    health,
    attack,
    defense,
    specialAtk,
    specialDef,
    speed,
    total,
  };

  const pokemonEffectiveness = getPokemonEffectiveness(types);

  return {
    id: pokemon.id,
    name: pokemon.name,
    types,
    avatarURL: pokemon.sprites.other['official-artwork'].front_default,
    characteristics,
    effectiveness: pokemonEffectiveness[0],
    height: adapterBodyDetails.transferHeightToMeter(pokemon.height),
    weight: adapterBodyDetails.transferWeightToKg(pokemon.weight),
    principalMove: pokemon.abilities[0].ability.name,
  };
}

function toPokemonDetails(pokemon: PokemonDetailsApi): PokemonDetails {
  const characteristicsGender: PokemonDetails['characteristicsGender'] = {
    gender: {
      fem: calculateGender(pokemon?.gender_rate).fem,
      masc: calculateGender(pokemon?.gender_rate).masc,
    },
  };
  console.log(pokemon.gender_rate);

  const description = adapterDescriptionApiReturn(
    pokemon.flavor_text_entries[7].flavor_text,
  );

  return {
    characteristicsGender,
    description,
  };
}

export const pokemonAdapter = {
  toPokemon,
  toPokemonDetails,
};
