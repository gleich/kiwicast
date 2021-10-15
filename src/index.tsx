import { Form, FormValue, ActionPanel, SubmitFormAction, showToast, ToastStyle } from "@raycast/api";

export default function Command() {
  function handleSubmit(values: Record<string, FormValue>) {
    console.log(values);
    showToast(ToastStyle.Success, "Submitted form", "See logs for submitted values");
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="textfield" title="Text field" placeholder="Enter text" />
      <Form.TextArea id="textarea" title="Text area" placeholder="Enter multi-line text" />
      <Form.Separator />
      <Form.DatePicker id="datepicker" title="Date picker" />
      <Form.Checkbox id="checkbox" title="Checkbox" label="Label right to the checkbox" storeValue />
      <Form.Dropdown id="dropdown" title="Dropdown">
        <Form.DropdownItem value="dropdown-item" title="Dropdown item" />
      </Form.Dropdown>
      <Form.TagPicker id="tokeneditor" title="Token editor">
        <Form.TagPickerItem value="tokeneditor-item" title="Token editor item" />
      </Form.TagPicker>
    </Form>
  );
}
