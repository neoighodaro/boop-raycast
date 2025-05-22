/**
 * MD5 Hash
 *
 * Generates an MD5 hash of the input text.
 *
 * @id md5Hash
 * @author neoish
 * @icon Icon.Shield
 */
import { createHash } from "crypto";

export default function (state: BoopState) {
  const hash = createHash("md5");
  hash.update(state.text);
  state.text = hash.digest("hex");
}
