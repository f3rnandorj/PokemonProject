function adapterDescriptionApiReturn(text: string): string {
  const adapter = text
    .replace(/\n/g, ' ')
    .replace(/(^\w|\.\s*\w)/gm, function (letter) {
      return letter.toUpperCase();
    });

  return adapter;
}

function adapterMaximumPokemonCharactersName(text: string): string {
  if (text.length <= 16) {
    return text;
  }

  const visibleCharacters = text.slice(0, 16);
  const maskedCharacters = '...';

  return visibleCharacters + maskedCharacters;
}

function adapterSomeNamesToUrlOfGif(name: string | null) {
  if (!name) {
    return;
  }

  if (name === 'nidoran-f') {
    name = 'nidoran_f';
  }

  if (name === 'nidoran-m') {
    name = 'nidoran_m';
  }

  if (name === 'mime-jr') {
    name = 'mime_jr';
  }

  if (name === 'mr-rime') {
    name = 'mr.rime';
  }

  return name;
}

export const masks = {
  adapterDescriptionApiReturn,
  adapterMaximumPokemonCharactersName,
  adapterSomeNamesToUrlOfGif,
};
