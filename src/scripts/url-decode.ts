/**
 * URL Decode
 *
 * Decodes URL-encoded text back to its original format.
 *
 * @id urlDecode
 * @author neoish
 * @icon Icon.Link
 */
export default function (state: BoopState) {
  try {
    state.text = decodeURIComponent(state.text);
  } catch {
    throw new Error("Invalid URL encoding");
  }
}
