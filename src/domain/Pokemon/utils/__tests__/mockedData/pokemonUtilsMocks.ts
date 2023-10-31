import { pokemonUtils } from '../../pokemonUtils';

const pokemonEvolutionMockTyrogue = {
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 20,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: 1,
            time_of_day: '',
            trade_species: null,
            trigger: {
              name: 'level-up',
              url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [],
        is_baby: false,
        species: {
          name: 'hitmonlee',
          url: 'https://pokeapi.co/api/v2/pokemon-species/106/',
        },
      },
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 20,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: -1,
            time_of_day: '',
            trade_species: null,
            trigger: {
              name: 'level-up',
              url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [],
        is_baby: false,
        species: {
          name: 'hitmonchan',
          url: 'https://pokeapi.co/api/v2/pokemon-species/107/',
        },
      },
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 20,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: 0,
            time_of_day: '',
            trade_species: null,
            trigger: {
              name: 'level-up',
              url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [],
        is_baby: false,
        species: {
          name: 'hitmontop',
          url: 'https://pokeapi.co/api/v2/pokemon-species/237/',
        },
      },
    ],
    is_baby: true,
    species: {
      name: 'tyrogue',
      url: 'https://pokeapi.co/api/v2/pokemon-species/236/',
    },
  },
  id: 47,
};

const pokemonEvolutionMockWithEvolution = {
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 16,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: '',
            trade_species: null,
            trigger: {
              name: 'level-up',
              url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null,
                held_item: null,
                item: null,
                known_move: null,
                known_move_type: null,
                location: null,
                min_affection: null,
                min_beauty: null,
                min_happiness: null,
                min_level: 32,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: '',
                trade_species: null,
                trigger: {
                  name: 'level-up',
                  url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
                },
                turn_upside_down: false,
              },
            ],
            evolves_to: [],
            is_baby: false,
            species: {
              name: 'venusaur',
              url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
            },
          },
        ],
        is_baby: false,
        species: {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
        },
      },
    ],
    is_baby: false,
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
  },
  id: 1,
};

const pokemonEvolutionMockWithoutEvolution = {
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [],
    is_baby: false,
    species: {
      name: 'lugia',
      url: 'https://pokeapi.co/api/v2/pokemon-species/249/',
    },
  },
  id: 127,
};

const removePokemonsWithoutDetails = [
  ...pokemonUtils.errorNames,
  'pikachu',
  'charmander',
];

const adaptedNames = [
  ['nidoran-f', 'nidoran_f'],
  ['nidoran-m', 'nidoran_m'],
  ['mime-jr', 'mime_jr'],
  ['mr-mime', 'mr.mime'],
  ['mr-rime', 'mr.rime'],
];

export const pokemonUtilsMocks = {
  pokemonEvolutionMockTyrogue,
  pokemonEvolutionMockWithEvolution,
  pokemonEvolutionMockWithoutEvolution,
  removePokemonsWithoutDetails,
  adaptedNames,
};
