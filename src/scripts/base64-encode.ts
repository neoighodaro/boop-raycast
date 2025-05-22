/**
 * Base64 Encode
 *
 * Encodes the input text to Base64 format.
 *
 * @id base64Encode
 * @author neoish
 * @icon Icon.Lock
 */
export default function (state: BoopState) {
  state.text = Buffer.from(state.text, "utf-8").toString("base64");
}
