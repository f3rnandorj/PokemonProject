import { Pokemon } from '@domain';

function transferHeightToMeter(height: Pokemon['height']): number {
  const heightInMeters = height / 10;

  return heightInMeters;
}

function transferWeightToKg(weight: Pokemon['weight']): number {
  const weightInKg = weight / 10;

  return weightInKg;
}

export const adapterBodyDetails = {
  transferHeightToMeter,
  transferWeightToKg,
};
