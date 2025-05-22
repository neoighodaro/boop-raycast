/**
 * Kebab Case
 *
 * Converts text to kebab-case format (lowercase words separated by hyphens).
 *
 * @id kebabCase
 * @author neoish
 * @icon Icon.Minus
 */
export default function (state: BoopState) {
  state.text = state.text
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}
