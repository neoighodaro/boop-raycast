/**
 * Pascal Case
 *
 * Converts text to PascalCase format (all words capitalized, no spaces).
 *
 * @id pascalCase
 * @author neoish
 * @icon Icon.TextCursor
 */
export default function (state: BoopState) {
  state.text = state.text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase());
}
