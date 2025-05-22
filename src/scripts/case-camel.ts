/**
 * Camel Case
 *
 * Converts text to camelCase format (first word lowercase, subsequent words capitalized, no spaces).
 *
 * @id camelCase
 * @author neoish
 * @icon Icon.TextCursor
 */
export default function (state: BoopState) {
  state.text = state.text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}
