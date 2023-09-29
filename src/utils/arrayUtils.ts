function sort<T>(array: T[], compareFn: (a: T, b: T) => number): T[] {
  return array.slice().sort(compareFn);
}

export const arrayUtils = {
  sort,
};
