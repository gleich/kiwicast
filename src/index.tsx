import { Form, FormValue, ActionPanel, SubmitFormAction, showToast, ToastStyle, preferences } from "@raycast/api";
import { exec } from "child_process";
import { read } from "./config";

export default function Command() {
  function handleSubmit(values: Record<string, FormValue>) {
    exec(
      `cd ${preferences.projectPath.value} && ${
        preferences.kiwiPath.value ? preferences.kiwiPath.value : "kiwi"
      } new --branch='${values.branchTemplate}' --class='${values.className}' --format='${
        values.latex ? "LaTeX" : "Markdown"
      }' --name='${values.name}' --root='${values.rootTemplate}' --type='${values.type}'`,
      (error, _stdout, stderr) => {
        if (error || stderr) {
          showToast(ToastStyle.Failure, "Failed to run kiwi command");
          if (error) {
            console.error(`error: ${error.message}`);
          } else {
            console.error(`stderr: ${stderr}`);
          }
          return;
        }
      }
    );
  }

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
      <Form.Dropdown id="className" title="Class">
        {config.classNames.map((c) => (
          <Form.DropdownItem key={c} value={c} title={c} />
        ))}
      </Form.Dropdown>
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
