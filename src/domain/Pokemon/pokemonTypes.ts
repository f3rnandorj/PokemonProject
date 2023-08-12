import {
  Ability,
  Color,
  EggGroup,
  EvolutionChain,
  FlavorTextEntry,
  Form,
  Genera,
  Generation,
  GrowthRate,
  Habitat,
  Index,
  Mfe,
  Name,
  PalParkEncounter,
  PokedexNumber,
  Shape,
  Species,
  Sprites,
  Stat,
  Type,
  Variety,
} from './complementTypes';

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  avatarURL: string;
  weight: number;
  height: number;
  principalMove: string;
  characteristics: {
    health: number;
    attack: number;
    defense: number;
    specialAtk: number;
    specialDef: number;
    speed: number;
    total: number;
  };
  effectiveness: string;
}

export interface PokemonDetails {
  description: string;
  characteristicsGender: {
    gender: {
      masc: number;
      fem: number;
    };
  };
}

export interface ListPokemonApi {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}
export interface PokemonApi {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: Index[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Mfe[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface PokemonDetailsApi {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: EggGroup[];
  evolution_chain: EvolutionChain;
  evolves_from_species: any;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Generation;
  growth_rate: GrowthRate;
  habitat: Habitat;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Shape;
  varieties: Variety[];
}
