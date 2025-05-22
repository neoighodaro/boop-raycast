/**
 * Base64 Decode
 *
 * Decodes Base64 encoded text back to its original format.
 *
 * @id base64Decode
 * @author neoish
 * @icon Icon.LockUnlocked
 */
export default function (state: BoopState) {
  try {
    state.text = Buffer.from(state.text, "base64").toString("utf-8");
  } catch {
    throw new Error("Invalid Base64 format");
  }
}
