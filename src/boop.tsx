import { Form, ActionPanel, Action, showToast } from "@raycast/api";

type Values = {
  textarea: string;
};

export default function Command() {
  function handleSubmit(values: Values) {
    console.log(values);
    showToast({ title: "Submitted form", message: "See logs for submitted values" });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="textarea" title="Text area" placeholder="Enter multi-line text" />
    </Form>
  );
}
