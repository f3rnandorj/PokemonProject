import { PokemonDetails } from '@domain';

const GENDER_RATE_CALCULATE = 8;
const PERCENT = 100;

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
