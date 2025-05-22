/**
 * Uppercase
 *
 * Converts all text to uppercase letters.
 *
 * @id uppercase
 * @author neoish
 * @icon Icon.TextCursor
 */
export default function (state: BoopState) {
  state.text = state.text.toUpperCase();
}
