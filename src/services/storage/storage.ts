export interface Storage {
  getAllItens: () => Promise<string[]>;
  getItem: <T>(key: string) => Promise<T>;
  setItem: <T>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

export let storage: Storage;

export function initializeStorage(storageImpl: Storage) {
  storage = storageImpl;
}
