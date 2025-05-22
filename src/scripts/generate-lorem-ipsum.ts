/**
 * Lorem Ipsum Generator
 *
 * Generates Lorem Ipsum placeholder text for design and layout purposes.
 *
 * @id loremIpsum
 * @bias 25
 * @author neoish
 * @icon Icon.Document
 */
export default function (state: BoopState) {
  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
  ];

  const wordCount = 50;
  const result = [];

  for (let i = 0; i < wordCount; i++) {
    result.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }

  let text = result.join(" ");
  text = text.charAt(0).toUpperCase() + text.slice(1);
  text = text.replace(/(\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+)/g, "$1. ");
  text = text.replace(/\.\s*$/, ".");

  state.text = text;
}
