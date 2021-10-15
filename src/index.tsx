import { Form, FormValue, ActionPanel, SubmitFormAction, showToast, ToastStyle, preferences } from "@raycast/api";
import { exec } from "child_process";
import { read } from "./config";

export default function Command() {
  function handleSubmit(values: Record<string, FormValue>) {
    console.log(values);
    showToast(ToastStyle.Success, "Submitted form", "See logs for submitted values");
  }

  exec(`${preferences.kiwiPath.value ? preferences.kiwiPath.value : "kiwi"} --help`, (error, _stdout, stderr) => {
    if (error || stderr) {
      showToast(ToastStyle.Failure, "Failed to run kiwi command");
      if (error) {
        console.error(`error: ${error.message}`);
      } else {
        console.log(`stderr: ${stderr}`);
      }
      return;
    }
  });

  const config = read(String(preferences.projectPath.value));
  const documentTypes = ["Worksheet", "Note", "Assessment", "Paper", "Lab", "Other"];

  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Name" />
      <Form.Dropdown id="type" title="Type">
        {documentTypes.map((t) => (
          <Form.DropdownItem key={t} value={t} title={t} />
        ))}
      </Form.Dropdown>
      <Form.Dropdown id="branchTemplate" title="Branch Template">
        {config.branchTemplates.map((t) => (
          <Form.DropdownItem key={t} value={t} title={t} />
        ))}
      </Form.Dropdown>
      <Form.Dropdown id="rootTemplate" title="Root Template">
        {config.rootTemplates.map((t) => (
          <Form.DropdownItem key={t} value={t} title={t} />
        ))}
      </Form.Dropdown>
      <Form.Checkbox id="latex" label="Use LaTeX" />
    </Form>
  );
}
