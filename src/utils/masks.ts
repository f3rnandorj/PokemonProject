function adapterDescriptionApiReturn(text: string): string {
  text = text.replace(/\n/g, ' ');
  text = text.replace(/\f/g, ' ');

  return text;
}

function changeDotForHyphen(text: string): string {
  return text.replace(/[\._]/g, '-');
}

function adapterMaximumPokemonCharactersName(text: string): string {
  if (text.length <= 16) {
    return text;
  }

  const visibleCharacters = text.slice(0, 16);
  const maskedCharacters = '...';

  return visibleCharacters + maskedCharacters;
}

export const masks = {
  adapterDescriptionApiReturn,
  adapterMaximumPokemonCharactersName,
  changeDotForHyphen,
};
