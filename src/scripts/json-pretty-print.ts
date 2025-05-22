/**
 * JSON Pretty Print
 *
 * Formats JSON text with proper indentation and line breaks for better readability.
 *
 * @id jsonPrettyPrint
 * @bias 75
 * @author neoish
 * @icon Icon.CodeBlock
 */
export default function (state: BoopState) {
  try {
    const parsed = JSON.parse(state.text);
    state.text = JSON.stringify(parsed, null, 2);
  } catch {
    throw new Error("Unable to parse JSON");
  }
}
