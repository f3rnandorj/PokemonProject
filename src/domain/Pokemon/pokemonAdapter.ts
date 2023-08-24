import {
  Pokemon,
  PokemonApi,
  PokemonDetails,
  PokemonDetailsApi,
  PokemonEvolutions,
  PokemonEvolutionsApi,
} from './pokemonTypes';
import {
  adapterBodyDetails,
  masks,
  calculateGender,
  getPokemonEffectiveness,
  PokemonTypeEnum,
  pokemonsEvolutions,
} from './utils';

const LAST_ID_WITH_TEXT_ENTRIES_7 = 898;

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
    name: masks.adapterMaximumPokemonCharactersName(pokemon.name),
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

  const numberOfDescription = pokemon.id > LAST_ID_WITH_TEXT_ENTRIES_7 ? 0 : 7;

  const description = masks.adapterDescriptionApiReturn(
    pokemon.flavor_text_entries[numberOfDescription].flavor_text,
  );

  return {
    characteristicsGender,
    description,
  };
}

function toPokemonEvolutions(
  pokemon: PokemonEvolutionsApi,
  pokemonName: Pokemon['name'],
): PokemonEvolutions {
  const evolutions = pokemonsEvolutions.getEvolutionsChain(
    pokemon,
    pokemonName,
  );

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
};
