/**
 * Trim Whitespaces
 *
 * Removes excess whitespaces from the text and trims the start and end of the text.
 *
 * @id trimWhitespaces
 * @author neoish
 * @icon scissors
 */
export default function (state: BoopState) {
  state.text = state.text.replace(/\s+/g, " ").trim();
}
