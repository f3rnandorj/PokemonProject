export enum PokemonTypeEnum {
  Normal = 'normal',
  Grass = 'grass',
  Fire = 'fire',
  Water = 'water',
  Electric = 'electric',
  Flying = 'flying',
  Ice = 'ice',
  Rock = 'rock',
  Ground = 'ground',
  Steel = 'steel',
  Fighting = 'fighting',
  Dark = 'dark',
  Psychic = 'psychic',
  Poison = 'poison',
  Bug = 'bug',
  Fairy = 'fairy',
  Ghost = 'ghost',
  Dragon = 'dragon',
}

type TypeData = {
  advantages: string[];
  weaknesses: string[];
  immunities: string[];
};

const pokemonEffectiveness: Record<PokemonTypeEnum, TypeData> = {
  [PokemonTypeEnum.Normal]: {
    advantages: [],
    weaknesses: ['Fighting'],
    immunities: ['Ghost'],
  },
  [PokemonTypeEnum.Grass]: {
    advantages: ['Ground', 'Rock', 'Water'],
    weaknesses: ['Bug', 'Fire', 'Flying', 'Ice', 'Poison'],
    immunities: [],
  },
  [PokemonTypeEnum.Fire]: {
    advantages: ['Bug', 'Grass', 'Ice', 'Steel'],
    weaknesses: ['Rock', 'Ground', 'Water'],
    immunities: [],
  },
  [PokemonTypeEnum.Water]: {
    advantages: ['Fire', 'Ground', 'Rock'],
    weaknesses: ['Electric', 'Grass'],
    immunities: [],
  },
  [PokemonTypeEnum.Electric]: {
    advantages: ['Water', 'Flying'],
    weaknesses: ['Ground'],
    immunities: [],
  },
  [PokemonTypeEnum.Flying]: {
    advantages: ['Bug', 'Fighting', 'Grass'],
    weaknesses: ['Electric', 'Ice', 'Rock'],
    immunities: ['Ground'],
  },
  [PokemonTypeEnum.Ice]: {
    advantages: ['Dragon', 'Flying', 'Grass', 'Ground'],
    weaknesses: ['Fighting', 'Fire', 'Rock', 'Steel'],
    immunities: [],
  },
  [PokemonTypeEnum.Rock]: {
    advantages: ['Bug', 'Fire', 'Flying', 'Ice'],
    weaknesses: ['Fighting', 'Grass', 'Ground', 'Steel', 'Water'],
    immunities: [],
  },
  [PokemonTypeEnum.Ground]: {
    advantages: ['Electric', 'Fire', 'Poison', 'Rock', 'Steel'],
    weaknesses: ['Ice', 'Grass', 'Water'],
    immunities: ['Electric'],
  },
  [PokemonTypeEnum.Steel]: {
    advantages: ['Fairy', 'Ice', 'Rock'],
    weaknesses: ['Fighting', 'Fire', 'Ground'],
    immunities: ['Poison'],
  },
  [PokemonTypeEnum.Fighting]: {
    advantages: ['Dark', 'Ice', 'Normal', 'Rock', 'Steel'],
    weaknesses: ['Fairy', 'Flying', 'Psychic'],
    immunities: [],
  },
  [PokemonTypeEnum.Dark]: {
    advantages: ['Ghost', 'Psychic'],
    weaknesses: ['Bug', 'Fairy', 'Fighting'],
    immunities: ['Psychic'],
  },
  [PokemonTypeEnum.Psychic]: {
    advantages: ['Fighting', 'Poison'],
    weaknesses: ['Bug', 'Dark', 'Ghost'],
    immunities: [],
  },
  [PokemonTypeEnum.Poison]: {
    advantages: ['Fairy', 'Grass'],
    weaknesses: ['Ground', 'Psychic'],
    immunities: [],
  },
  [PokemonTypeEnum.Bug]: {
    advantages: ['Dark', 'Grass', 'Psychic'],
    weaknesses: ['Fire', 'Flying', 'Rock'],
    immunities: [],
  },
  [PokemonTypeEnum.Fairy]: {
    advantages: ['Dark', 'Dragon', 'Fighting'],
    weaknesses: ['Poison', 'Steel'],
    immunities: ['Dragon'],
  },
  [PokemonTypeEnum.Ghost]: {
    advantages: ['Ghost', 'Psychic'],
    weaknesses: ['Dark', 'Ghost'],
    immunities: ['Normal', 'Fighting'],
  },
  [PokemonTypeEnum.Dragon]: {
    advantages: ['Dragon'],
    weaknesses: ['Dragon', 'Fairy', 'Ice'],
    immunities: [],
  },
};

export function getPokemonEffectiveness(
  typesName: PokemonTypeEnum[],
): string[] {
  const pokemonEffectivenessTypes = typesName.map(typeName => {
    return pokemonEffectiveness[typeName];
  });

  const effectiveness = pokemonEffectivenessTypes.map(infos => {
    const advantagesText =
      infos?.advantages && infos?.advantages?.length > 0
        ? `are strong against pokémon of type ${infos.advantages.join(', ')}`
        : 'do not have advantages against any type of Pokémon';

    const weaknessesText =
      infos?.weaknesses && infos?.weaknesses?.length > 0
        ? `are weak against pokémon of type ${infos.weaknesses.join(', ')}`
        : 'do not have weaknesses against any type of pokémon';

    const secondTypeEffectiveness =
      typesName.length > 1
        ? `Pokémon of type ${typesName[1]} ${advantagesText} and ${weaknessesText}`
        : '';

    return `Pokémon of type ${typesName[0]} ${advantagesText} and ${weaknessesText}. ${secondTypeEffectiveness}`;
  });

  return effectiveness;
}
