/**
 * Divide un texto en la primera coincidencia de `word`, devolviendo las
 * partes anterior y posterior. Devuelve `null` si la palabra no aparece.
 */
export function splitOnWord(
  text: string,
  word: string,
): { before: string; after: string } | null {
  const idx = text.indexOf(word);
  if (idx === -1) return null;
  return { before: text.slice(0, idx), after: text.slice(idx + word.length) };
}

/** Separa la primera palabra del resto, por el primer espacio. */
export function splitFirstWord(text: string): [string, string] {
  const space = text.indexOf(" ");
  if (space === -1) return [text, ""];
  return [text.slice(0, space), text.slice(space + 1)];
}
