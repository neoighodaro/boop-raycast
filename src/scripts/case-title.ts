/**
 * Title Case
 *
 * Capitalizes the first letter of each word while making the rest lowercase.
 *
 * @id titleCase
 * @author neoish
 * @icon Icon.TextCursor
 */
export default function (state: BoopState) {
  state.text = state.text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
