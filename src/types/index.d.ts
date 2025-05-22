interface BoopState {
  text: string;
  intent: BoopIntents;
}

interface ActionsProps {
  handleSubmit: (state: BoopState) => void;
  onStart?: (state: BoopState) => void;
  onFailure?: (state: BoopState) => void;
  onSuccess?: (state: BoopState) => void;
}

type BoopIntents = "jsonMinify" | "jsonPrettyPrint" | "loremIpsum" | "base64Decode" | "base64Encode" | "camelCase" | "generatePassword" | "htmlDecode" | "htmlEncode" | "kebabCase" | "lowercase" | "md5Hash" | "pascalCase" | "removeDuplicates" | "reverseText" | "sha256Hash" | "snakeCase" | "titleCase" | "trimWhitespaces" | "uppercase" | "urlDecode" | "urlEncode";
