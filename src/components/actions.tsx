import { ActionPanel, Action } from "@raycast/api";
import * as Boop from "~/scripts";

interface ActionsProps {
  handleSubmit: (state: BoopState) => void;
  onStart?: (state: BoopState) => void;
  onFailure?: (state: BoopState) => void;
  onSuccess?: (state: BoopState) => void;
}

export default function Actions({ handleSubmit, onStart, onSuccess }: ActionsProps) {
  const onSubmit = (state: BoopState) => {
    onStart?.(state);
    Boop[state.intent](state);
    handleSubmit(state);
    onSuccess?.(state);
  };

  return (
    <ActionPanel>
      <Action.SubmitForm
        title="Trim Whitespaces"
        onSubmit={(state) => onSubmit({ ...state, intent: "trimWhitespaces" } as BoopState)}
      />
    </ActionPanel>
  );
}
