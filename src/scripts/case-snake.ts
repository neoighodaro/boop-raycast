/**
 * Snake Case
 *
 * Converts text to snake_case format (lowercase words separated by underscores).
 *
 * @id snakeCase
 * @author neoish
 * @icon Icon.Underline
 */
export default function (state: BoopState) {
  state.text = state.text
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}
