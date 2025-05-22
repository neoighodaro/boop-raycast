/**
 * HTML Encode
 *
 * Encodes HTML special characters to prevent XSS and display issues.
 *
 * @id htmlEncode
 * @author neoish
 * @icon Icon.Code
 */
export default function (state: BoopState) {
  const htmlEntities: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  state.text = state.text.replace(/[&<>"']/g, (match) => htmlEntities[match]);
}
