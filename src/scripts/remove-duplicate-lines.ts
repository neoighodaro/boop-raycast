/**
 * Remove Duplicate Lines
 *
 * Removes duplicate lines from the text while preserving order.
 *
 * @id removeDuplicates
 * @author neoish
 * @icon Icon.MinusCircle
 */
export default function (state: BoopState) {
  const lines = state.text.split("\n");
  const seen = new Set();
  const uniqueLines = lines.filter((line) => {
    if (seen.has(line)) {
      return false;
    }
    seen.add(line);
    return true;
  });
  state.text = uniqueLines.join("\n");
}
