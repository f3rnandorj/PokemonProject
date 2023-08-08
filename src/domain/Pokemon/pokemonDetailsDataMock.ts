import { PokemonDetails } from '@domain';

export const pokemonDetailsDataMock: PokemonDetails = {
  id: '1',
  name: 'bulbassaur',
  types: ['grass', 'poison'],
  avatarURL:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  description:
    'Bulbasaur pode ser visto cochilando sob a luz do sol. Há uma semente nas costas. Ao absorver os raios do sol, a semente cresce progressivamente maior.',
  weight: 6.9,
  height: 0.7,
  principalMove: 'Chicote de Vinha',
  characteristics: {
    gender: {
      masc: 87.5,
      fem: 12.5,
    },
    health: 45,
    attack: 65,
    defense: 49,
    atkSpeed: 65,
    defSpeed: 65,
    speed: 45,
    total: 317,
  },
  effectiveness:
    'Pokémon tipo grama são fortes contra pokémon do tipo Água, Terra, Pedra mas eles são fracos contra pokémon do tipo Fogo, Grama, Veneno, Voador, Inseto, Dragão. Pokémon tipo veneno são fortes contra pokémon do tipo Grama, Inseto, Fada mas eles são fracos contra pokémon do tipo Veneno, Terra, Pedra, Fantasma.',
};
