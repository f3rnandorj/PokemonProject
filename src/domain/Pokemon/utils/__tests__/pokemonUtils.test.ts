import { pokemonUtils } from '../pokemonUtils';

import { pokemonUtilsMocks } from './mockedData/pokemonUtilsMocks';

describe('pokemonUtils', () => {
  describe('areEqualNames', () => {
    test('should is the same name', () => {
      const testNames = pokemonUtils.areEqualNames('Pikachu', 'pikachu');
      expect(testNames).toBeTruthy();
    });
  });
  describe('getEvolutionsChain', () => {
    test('it should returns a basic pokemon evolutions', () => {
      const {
        hasEvolution,
        hasLastEvolution,
        hasNextEvolution,
        lastEvolutionName,
        nextEvolutionName,
        moreThanOneMidEvolutions,
      } = pokemonUtils.getEvolutionsChain(
        pokemonUtilsMocks.pokemonEvolutionMockWithEvolution,
        'bulbasaur',
      );

      expect(hasEvolution).toBeTruthy();
      expect(hasLastEvolution).toBeFalsy();
      expect(hasNextEvolution).toBeTruthy();
      expect(lastEvolutionName).toBeNull();
      expect(nextEvolutionName).toBe('ivysaur');
      expect(moreThanOneMidEvolutions).toBeFalsy();
    });
    test('it should returns a medium pokemon evolutions', () => {
      const {
        hasEvolution,
        hasLastEvolution,
        hasNextEvolution,
        lastEvolutionName,
        nextEvolutionName,
        moreThanOneMidEvolutions,
      } = pokemonUtils.getEvolutionsChain(
        pokemonUtilsMocks.pokemonEvolutionMockWithEvolution,
        'ivysaur',
      );

      expect(hasEvolution).toBeTruthy();
      expect(hasLastEvolution).toBeTruthy();
      expect(hasNextEvolution).toBeTruthy();
      expect(lastEvolutionName).toBe('bulbasaur');
      expect(nextEvolutionName).toBe('venusaur');
      expect(moreThanOneMidEvolutions).toBeFalsy();
    });
    test('it should returns a last pokemon evolutions', () => {
      const {
        hasEvolution,
        hasLastEvolution,
        hasNextEvolution,
        lastEvolutionName,
        nextEvolutionName,
        moreThanOneMidEvolutions,
      } = pokemonUtils.getEvolutionsChain(
        pokemonUtilsMocks.pokemonEvolutionMockWithEvolution,
        'venusaur',
      );

      expect(hasEvolution).toBeTruthy();
      expect(hasLastEvolution).toBeTruthy();
      expect(hasNextEvolution).toBeFalsy();
      expect(lastEvolutionName).toBe('ivysaur');
      expect(nextEvolutionName).toBeNull();
      expect(moreThanOneMidEvolutions).toBeFalsy();
    });
    test('it should returns false if pokemon does not have evolution', () => {
      const { hasEvolution } = pokemonUtils.getEvolutionsChain(
        pokemonUtilsMocks.pokemonEvolutionMockWithoutEvolution,
        'lugia',
      );

      expect(hasEvolution).toBeFalsy();
    });
    test('it should returns if pokemon have more then one evolution (eevee, tyrogue)', () => {
      const {
        hasEvolution,
        hasLastEvolution,
        hasNextEvolution,
        lastEvolutionName,
        nextEvolutionName,
        moreThanOneMidEvolutions,
      } = pokemonUtils.getEvolutionsChain(
        pokemonUtilsMocks.pokemonEvolutionMockTyrogue,
        'tyrogue',
      );

      expect(hasEvolution).toBeTruthy();
      expect(hasLastEvolution).toBeFalsy();
      expect(hasNextEvolution).toBeTruthy();
      expect(lastEvolutionName).toBeNull();
      expect(nextEvolutionName).toBe('hitmonlee');
      expect(moreThanOneMidEvolutions).toEqual([
        'hitmonlee',
        'hitmonchan',
        'hitmontop',
      ]);
    });
  });
  describe('calculateGender', () => {
    test('should calculate render from 0 to 8 and give the correct masc and fem', () => {
      const { fem, masc } = pokemonUtils.calculateGender(2);

      expect(fem).toBe(25);
      expect(masc).toBe(75);
    });
  });
  describe('transferHeightToMeter', () => {
    test('should transfer height to meter', () => {
      const testTransferHeightToMeter = pokemonUtils.transferHeightToMeter(20);

      expect(testTransferHeightToMeter).toBe(2);
    });
  });
  describe('transferWeightToKg', () => {
    test('should transfer weight to Kg', () => {
      const testTransferHeightToMeter = pokemonUtils.transferWeightToKg(40);

      expect(testTransferHeightToMeter).toBe(4);
    });
  });
  describe('removePokemonsWithoutDetails', () => {
    test('should remove any names that exists on ../pokemonUtils.errorNames', () => {
      const testTransferHeightToMeter =
        pokemonUtils.removePokemonsWithoutDetails(
          pokemonUtilsMocks.removePokemonsWithoutDetails,
        );

      expect(testTransferHeightToMeter.length).toBe(2);
      expect(testTransferHeightToMeter).toEqual(['pikachu', 'charmander']);
    });
  });
  describe('adapterSomeNamesToUrlOfGif', () => {
    test('should return the same name if it does not require adaptation', () => {
      const names = ['bulbasaur', 'pikachu', 'charizard'];
      names.forEach(name => {
        const result = pokemonUtils.adapterSomeNamesToUrlOfGif(name);
        expect(result).toBe(name);
      });
    });
    test('should adapt specific names to gift image format', () => {
      pokemonUtilsMocks.adaptedNames.forEach(([name, expected]) => {
        const result = pokemonUtils.adapterSomeNamesToUrlOfGif(name);
        expect(result).toBe(expected);
      });
    });
    test('should return undefined if the input name is null', () => {
      const name = null;
      const result = pokemonUtils.adapterSomeNamesToUrlOfGif(name);
      expect(result).toBeUndefined();
    });
  });
});
