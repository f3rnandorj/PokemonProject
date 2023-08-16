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

  // console.log({ hasEvolution });

  const basicPokemon = pokemon?.chain?.species?.name ?? null;
  // console.log({ basicPokemon });
  const mediumPokemon = pokemon?.chain?.evolves_to[0].species?.name ?? null;
  // console.log('chegou aqui');
  console.log({ mediumPokemon });
  const highPokemon =
    pokemon?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name ?? null;
  // console.log('chegou aqui 1');
  console.log({ highPokemon });
  // console.log('chegou aqui 2');
  const isBasicPokemon = areEqualNames(basicPokemon, pokemonName);
  // console.log('chegou aqui 3');
  // console.log({ isBasicPokemon });
  // console.log({ isMediumPokemon });
  // console.log({ isHighPokemon });
  // console.log({ hasLastEvolution });
  // console.log({ hasNextEvolution });
  // console.log({ lastEvolutionName });
  // console.log({ nextEvolutionName });
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
