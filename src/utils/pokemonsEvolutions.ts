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
    pokemonName === 'slowbro' || pokemonName === 'slowking'
      ? pokemon?.chain?.evolves_to[1].species?.name ?? null
      : pokemon?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name ?? null;

  const mediumEvolutionsOfPokemon =
    pokemonName === 'eevee' || pokemonName === 'tyrogue'
      ? pokemon?.chain?.evolves_to.map(evolvesTo => evolvesTo.species.name)
      : null;

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

  let lastEvolutionName = isMediumPokemon
    ? basicPokemon
    : isHighPokemon
    ? mediumPokemon
    : null;

  const nextEvolutionName = isBasicPokemon
    ? mediumPokemon
    : isMediumPokemon
    ? highPokemon
    : null;

  if (basicPokemon === 'eevee' && pokemonName !== 'eevee') {
    hasLastEvolution = true;
    lastEvolutionName = 'eevee';
  }

  if (basicPokemon === 'tyrogue' && pokemonName !== 'tyrogue') {
    hasLastEvolution = true;
    lastEvolutionName = 'tyrogue';
  }

  return {
    hasEvolution,
    hasLastEvolution,
    lastEvolutionName,
    hasNextEvolution,
    nextEvolutionName,
    moreThanOneMidEvolutions: mediumEvolutionsOfPokemon,
  };
}

export const pokemonsEvolutions = {
  areEqualNames,
  getEvolutionsChain,
};
