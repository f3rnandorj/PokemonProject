import { masks } from '@utils';

import {
  Pokemon,
  PokemonApi,
  PokemonDetails,
  PokemonDetailsApi,
  PokemonEvolutions,
  PokemonEvolutionsApi,
} from './pokemonTypes';
import {
  calculateGender,
  getPokemonEffectiveness,
  PokemonTypeEnum,
} from './utils';
import { pokemonUtils } from './utils/pokemonUtils';

function toClearPokemonNames(pokemonNames: string[]): string[] {
  return pokemonUtils.removePokemonsWithoutDetails(pokemonNames);
}

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

  // pokemonUtils.adapterSomeNamesToUrlOfGif(pokemon.name);
  // masks.changeDotForHyphen(pokemon.name)

  return {
    id: pokemon.id,
    name: masks.changeDotForHyphen(pokemon.name),
    types,
    avatarURL: pokemon.sprites.other['official-artwork'].front_default,
    characteristics,
    effectiveness: pokemonEffectiveness[0],
    height: pokemonUtils.transferHeightToMeter(pokemon.height),
    weight: pokemonUtils.transferWeightToKg(pokemon.weight),
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

  const pokemonAdapter = pokemon.flavor_text_entries[7]
    ? pokemon.flavor_text_entries[7].flavor_text
    : pokemon.flavor_text_entries[0].flavor_text;

  const description = masks.adapterDescriptionApiReturn(pokemonAdapter);

  return {
    characteristicsGender,
    description,
    captureRate: pokemon.capture_rate,
  };
}

function toPokemonEvolutions(
  pokemon: PokemonEvolutionsApi,
  pokemonName: Pokemon['name'],
): PokemonEvolutions {
  const evolutions = pokemonUtils.getEvolutionsChain(pokemon, pokemonName);

  return {
    hasEvolution: evolutions.hasEvolution,
    hasLastEvolution: evolutions.hasLastEvolution,
    lastEvolutionName: evolutions.lastEvolutionName,
    hasNextEvolution: evolutions.hasNextEvolution,
    nextEvolutionName: evolutions.nextEvolutionName,
    moreThanOneMidEvolutions: evolutions.moreThanOneMidEvolutions,
  };
}

export const pokemonAdapter = {
  toPokemon,
  toPokemonDetails,
  toPokemonEvolutions,
  toClearPokemonNames,
};
