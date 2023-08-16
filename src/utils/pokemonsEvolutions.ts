import { Pokemon, PokemonEvolutions, PokemonEvolutionsApi } from '@domain';

function areEqualNames(name1: string, name2: string) {
  name1 = name1.toLowerCase();
  name2 = name2.toLowerCase();

  return name1 === name2;
}

function getEvolutionsChain(
  pokemon: PokemonEvolutionsApi,
  pokemonName: Pokemon['name'],
): PokemonEvolutions {
  let hasEvolution = false;
  let hasLastEvolution = false;
  let hasNextEvolution = false;

  pokemon.chain.evolves_to[0] !== undefined
    ? (hasEvolution = true)
    : (hasEvolution = false);

  if (!hasEvolution) {
    return {
      hasEvolution,
      hasLastEvolution: false,
      lastEvolutionName: null,
      hasNextEvolution: false,
      nextEvolutionName: null,
    };
  }

  const basicPokemon = pokemon?.chain?.species?.name ?? null;
  const mediumPokemon = pokemon?.chain?.evolves_to[0].species?.name ?? null;
  const highPokemon =
    pokemon?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name ?? null;

  const isBasicPokemon = areEqualNames(basicPokemon, pokemonName);
  const isMediumPokemon =
    mediumPokemon !== null && areEqualNames(mediumPokemon, pokemonName)
      ? (hasLastEvolution = true)
      : false;
  const isHighPokemon =
    highPokemon !== null && areEqualNames(highPokemon, pokemonName)
      ? (hasLastEvolution = true)
      : false;

  if (isBasicPokemon && mediumPokemon !== null) {
    hasNextEvolution = true;
  }

  if (isMediumPokemon && highPokemon !== null) {
    hasNextEvolution = true;
  }

  const lastEvolutionName = isMediumPokemon
    ? basicPokemon
    : isHighPokemon
    ? mediumPokemon
    : null;

  const nextEvolutionName = isBasicPokemon
    ? mediumPokemon
    : isMediumPokemon
    ? highPokemon
    : null;

  return {
    hasEvolution,
    hasLastEvolution,
    lastEvolutionName,
    hasNextEvolution,
    nextEvolutionName,
  };
}

export const pokemonsEvolutions = {
  areEqualNames,
  getEvolutionsChain,
};
