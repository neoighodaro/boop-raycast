/**
 * Lowercase
 *
 * Converts all text to lowercase letters.
 *
 * @id lowercase
 * @author neoish
 * @icon Icon.TextCursor
 */
export default function (state: BoopState) {
  state.text = state.text.toLowerCase();
}
