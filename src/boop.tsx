import { Form, showToast } from "@raycast/api";
import Actions from "./components/actions";
import React from "react";
import { showFailureToast, useForm } from "@raycast/utils";

export default function Command() {
  const [isLoading, setIsLoading] = React.useState(false);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const { handleSubmit, setValue, itemProps } = useForm<BoopState>({
    onSubmit: ({ text }) => {
      if (isLoading) {
        showFailureToast({ title: "Still processing a pending request" });
        return;
      }

      setValue("text", text);
      showToast({ title: "🎉 Action Completed" });
    },
    initialValues: { text: "" },
  });

  const actions = { handleSubmit, onStart: startLoading, onFailure: stopLoading, onSuccess: stopLoading };

  return (
    <Form actions={<Actions {...actions} />} navigationTitle="Boop" isLoading={isLoading}>
      <Form.TextArea placeholder="..." {...itemProps.text} />
    </Form>
  );
}
