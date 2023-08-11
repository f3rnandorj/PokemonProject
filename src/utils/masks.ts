export function adapterDescriptionApiReturn(text: string) {
  const adapter = text
    .replace(/\n/g, ' ')
    .replace(/(^\w|\.\s*\w)/gm, function (letter) {
      return letter.toUpperCase();
    });

  return adapter;
}

export const masks = {
  adapterDescriptionApiReturn,
};
