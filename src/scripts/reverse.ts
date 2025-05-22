/**
 * Reverse Text
 *
 * Reverses the order of characters in the text.
 *
 * @id reverseText
 * @author neoish
 * @icon Icon.ArrowLeftCircle
 */
export default function (state: BoopState) {
  state.text = state.text.split("").reverse().join("");
}
