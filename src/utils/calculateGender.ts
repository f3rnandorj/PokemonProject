import { Pokemon } from '@domain';

const GENDER_RATE_CALCULATE = 8;
const PERCENT = 100;

export function calculateGender(
  genderRate: number,
): Pokemon['characteristics']['gender'] {
  const fem = (genderRate / GENDER_RATE_CALCULATE) * PERCENT;
  const masc = PERCENT - fem;

  return {
    fem,
    masc,
  };
}
