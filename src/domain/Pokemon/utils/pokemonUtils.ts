import {
  Pokemon,
  PokemonDetails,
  PokemonEvolutions,
  PokemonEvolutionsApi,
} from '@domain';

const GENDER_RATE_CALCULATE = 8;
const PERCENT = 100;

const errorNames = [
  'deoxys-normal',
  'wormadam-plant',
  'giratina-altered',
  'shaymin-land',
  'basculin-red-striped',
  'darmanitan-standard',
  'tornadus-incarnate',
  'thundurus-incarnate',
  'landorus-incarnate',
  'keldeo-ordinary',
  'meloetta-aria',
  'meowstic-male',
  'aegislash-shield',
  'pumpkaboo-average',
  'gourgeist-average',
  'zygarde-50',
  'oricorio-baile',
  'lycanroc-midday',
  'wishiwashi-solo',
  'minior-red-meteor',
  'mimikyu-disguised',
  'toxtricity-amped',
  'eiscue-ice',
  'indeedee-male',
  'morpeko-full-belly',
  'urshifu-single-strike',
];

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

export function calculateGender(
  genderRate: number,
): PokemonDetails['characteristicsGender']['gender'] {
  const fem = (genderRate / GENDER_RATE_CALCULATE) * PERCENT;
  const masc = PERCENT - fem;

  return {
    fem: genderRate < 0 ? 0 : fem,
    masc: genderRate < 0 ? 0 : masc,
  };
}

function transferHeightToMeter(height: Pokemon['height']): number {
  const heightInMeters = height / 10;

  return heightInMeters;
}

function transferWeightToKg(weight: Pokemon['weight']): number {
  const weightInKg = weight / 10;

  return weightInKg;
}

function removePokemonsWithoutDetails(names: string[]): string[] {
  return names.filter(name => !errorNames.includes(name));
}

function adapterSomeNamesToUrlOfGif(name: string | null) {
  if (!name) {
    return;
  }

  if (name === 'nidoran-f') {
    name = 'nidoran_f';
  }

  if (name === 'nidoran-m') {
    name = 'nidoran_m';
  }

  if (name === 'mime-jr') {
    name = 'mime_jr';
  }

  if (name === 'mr-mime') {
    name = 'mr.mime';
  }

  if (name === 'mr-rime') {
    name = 'mr.rime';
  }

  return name;
}

export const pokemonUtils = {
  areEqualNames,
  getEvolutionsChain,
  calculateGender,
  transferHeightToMeter,
  transferWeightToKg,
  removePokemonsWithoutDetails,
  adapterSomeNamesToUrlOfGif,
  errorNames,
};
