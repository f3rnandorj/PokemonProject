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
    weaknesses: ['fighting'],
    immunities: ['ghost'],
  },
  [PokemonTypeEnum.Grass]: {
    advantages: ['ground', 'rock', 'water'],
    weaknesses: ['bug', 'fire', 'flying', 'ice', 'Poison'],
    immunities: [],
  },
  [PokemonTypeEnum.Fire]: {
    advantages: ['bug', 'grass', 'ice', 'steel'],
    weaknesses: ['rock', 'ground', 'water'],
    immunities: [],
  },
  [PokemonTypeEnum.Water]: {
    advantages: ['fire', 'ground', 'rock'],
    weaknesses: ['electric', 'grass'],
    immunities: [],
  },
  [PokemonTypeEnum.Electric]: {
    advantages: ['water', 'flying'],
    weaknesses: ['ground'],
    immunities: [],
  },
  [PokemonTypeEnum.Flying]: {
    advantages: ['bug', 'fighting', 'grass'],
    weaknesses: ['electric', 'ice', 'rock'],
    immunities: ['ground'],
  },
  [PokemonTypeEnum.Ice]: {
    advantages: ['dragon', 'flying', 'grass', 'ground'],
    weaknesses: ['fighting', 'fire', 'rock', 'steel'],
    immunities: [],
  },
  [PokemonTypeEnum.Rock]: {
    advantages: ['bug', 'fire', 'flying', 'ice'],
    weaknesses: ['fighting', 'grass', 'ground', 'steel', 'water'],
    immunities: [],
  },
  [PokemonTypeEnum.Ground]: {
    advantages: ['electric', 'fire', 'poison', 'Rock', 'Steel'],
    weaknesses: ['ice', 'Grass', 'Water'],
    immunities: ['electric'],
  },
  [PokemonTypeEnum.Steel]: {
    advantages: ['fairy', 'ice', 'rock'],
    weaknesses: ['fighting', 'fire', 'ground'],
    immunities: ['poison'],
  },
  [PokemonTypeEnum.Fighting]: {
    advantages: ['dark', 'ice', 'normal', 'rock', 'steel'],
    weaknesses: ['fairy', 'flying', 'psychic'],
    immunities: [],
  },
  [PokemonTypeEnum.Dark]: {
    advantages: ['ghost', 'psychic'],
    weaknesses: ['bug', 'fairy', 'fighting'],
    immunities: ['psychic'],
  },
  [PokemonTypeEnum.Psychic]: {
    advantages: ['fighting', 'poison'],
    weaknesses: ['bug', 'dark', 'ghost'],
    immunities: [],
  },
  [PokemonTypeEnum.Poison]: {
    advantages: ['fairy', 'grass'],
    weaknesses: ['ground', 'psychic'],
    immunities: [],
  },
  [PokemonTypeEnum.Bug]: {
    advantages: ['dark', 'grass', 'psychic'],
    weaknesses: ['fire', 'flying', 'rock'],
    immunities: [],
  },
  [PokemonTypeEnum.Fairy]: {
    advantages: ['dark', 'dragon', 'fighting'],
    weaknesses: ['poison', 'steel'],
    immunities: ['dragon'],
  },
  [PokemonTypeEnum.Ghost]: {
    advantages: ['ghost', 'psychic'],
    weaknesses: ['dark', 'ghost'],
    immunities: ['normal', 'fighting'],
  },
  [PokemonTypeEnum.Dragon]: {
    advantages: ['dragon'],
    weaknesses: ['dragon', 'fairy', 'ice'],
    immunities: [],
  },
};

export function getPokemonEffectiveness(typesName: PokemonTypeEnum[]): string {
  const pokemonEffectivenessTypes = typesName.map(typeName => {
    return pokemonEffectiveness[typeName];
  });

  const adaptedEffectiveness: string[] = [];

  pokemonEffectivenessTypes.map((infos, index) => {
    const type = getTranslationType(typesName[index]);
    const advantages = infos.advantages.map(adv => getTranslationType(adv));
    const weaknesses = infos.weaknesses.map(wek => getTranslationType(wek));

    const advantagesText =
      infos?.advantages && infos?.advantages?.length > 0
        ? `são fortes contra pokémons do tipo ${advantages.join(', ')}`
        : 'não tem vantagens contra nenhum tipo de Pokémon';

    const weaknessesText =
      infos?.weaknesses && infos?.weaknesses?.length > 0
        ? `são fracos contra pokémons do tipo ${weaknesses.join(', ')}`
        : 'não tem desvantagens contra nenhum tipo de Pokémon';

    adaptedEffectiveness.push(
      `Pokémons do tipo ${type} ${advantagesText} e ${weaknessesText}.`,
    );
  });

  const effectiveness = adaptedEffectiveness.join(' ');

  return effectiveness;
}

function getTranslationType(typeName: string): string {
  switch (true) {
    case typeName === 'grass':
      return 'planta';
    case typeName === 'fire':
      return 'fogo';
    case typeName === 'water':
      return 'água';
    case typeName === 'electric':
      return 'elétrico';
    case typeName === 'flying':
      return 'voador';
    case typeName === 'rock':
      return 'pedra';
    case typeName === 'ground':
      return 'terrestre';
    case typeName === 'steel':
      return 'aço';
    case typeName === 'fighting':
      return 'lutador';
    case typeName === 'dark':
      return 'sombrio';
    case typeName === 'psychic':
      return 'psíquico';
    case typeName === 'poison':
      return 'venenoso';
    case typeName === 'bug':
      return 'inseto';
    case typeName === 'fairy':
      return 'fada';
    case typeName === 'ghost':
      return 'fantasma';
    case typeName === 'dragon':
      return 'dragão';
    case typeName === 'ice':
      return 'gelo';

    default:
      return 'normal';
  }
}
