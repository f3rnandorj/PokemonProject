export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  avatarURL: string;
}

export interface PokemonDetails extends Pokemon {
  description: string;
  weight: number;
  height: number;
  principalMove: string;
  characteristics: {
    gender: {
      masc: number;
      fem: number;
    };
    health: number;
    attack: number;
    defense: number;
    atkSpeed: number;
    defSpeed: number;
    speed: number;
    total: number;
  };
  effectiveness: string;
}
