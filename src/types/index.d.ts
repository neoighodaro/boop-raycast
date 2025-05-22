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

type BoopIntents = "base64Encode" | "trimWhitespaces";
