/**
 * HTML Decode
 *
 * Decodes HTML entities back to their original characters.
 *
 * @id htmlDecode
 * @author neoish
 * @icon Icon.Code
 */
export default function (state: BoopState) {
  const htmlEntities: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };

  state.text = state.text.replace(/&(amp|lt|gt|quot|#39|apos);/g, (match) => htmlEntities[match] || match);
}
