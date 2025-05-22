/**
 * SHA256 Hash
 *
 * Generates a SHA256 hash of the input text.
 *
 * @id sha256Hash
 * @author neoish
 * @icon Icon.Shield
 */
import { createHash } from "crypto";

export default function (state: BoopState) {
  const hash = createHash("sha256");
  hash.update(state.text);
  state.text = hash.digest("hex");
}
