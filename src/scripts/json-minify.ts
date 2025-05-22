/**
 * JSON Minify
 *
 * Removes all unnecessary whitespace from JSON text to create a compact format.
 *
 * @id jsonMinify
 * @bias 90
 * @author neoish
 * @icon Icon.CodeBlock
 */
export default function (state: BoopState) {
  try {
    const parsed = JSON.parse(state.text);
    state.text = JSON.stringify(parsed);
  } catch {
    throw new Error("Unable to parse JSON");
  }
}
