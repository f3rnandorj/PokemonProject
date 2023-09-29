import { MMKV } from 'react-native-mmkv';

import { Storage } from '../storage';

const MMKVInstance = new MMKV();

export const MMKVStorage: Storage = {
  getAllItens: async <T>(): Promise<T[]> => {
    const allKeys = MMKVInstance.getAllKeys();

    const allPokemons = [];

    for (const key of allKeys) {
      const pokemon = MMKVInstance.getString(key);
      if (pokemon) {
        const parsePokemon = JSON.parse(pokemon);
        allPokemons.push(parsePokemon);
      }
    }

    return allPokemons;
  },
  getItem: async key => {
    const item = MMKVInstance.getString(key);

    if (item) {
      return JSON.parse(item);
    } else {
      return null;
    }
  },
  setItem: async (key, value) => {
    MMKVInstance.set(key, JSON.stringify(value));
  },
  removeItem: async key => {
    MMKVInstance.delete(key);
  },
};
