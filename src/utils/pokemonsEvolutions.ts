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
  const hasEvolution = pokemon.chain.evolves_to[0] !== undefined ? true : false;

  const basicPokemon = pokemon?.chain?.species?.name;
  const mediumPokemon = pokemon?.chain?.evolves_to[0].species?.name;
  const highPokemon =
    pokemon?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;

  const isBasicPokemon = areEqualNames(basicPokemon, pokemonName);
  const isMediumPokemon = areEqualNames(mediumPokemon, pokemonName);
  const isHighPokemon = areEqualNames(highPokemon, pokemonName);

  const hasLastEvolution = isBasicPokemon
    ? false
    : isMediumPokemon || isHighPokemon;

  const hasNextEvolution = isHighPokemon
    ? false
    : isBasicPokemon || isMediumPokemon;

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
