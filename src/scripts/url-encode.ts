/**
 * URL Encode
 *
 * Encodes text for safe use in URLs by converting special characters.
 *
 * @id urlEncode
 * @author neoish
 * @icon Icon.Link
 */
export default function (state: BoopState) {
  state.text = encodeURIComponent(state.text);
}
