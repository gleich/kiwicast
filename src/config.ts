import path from "path";
import fs from "fs";
import { showToast, ToastStyle } from "@raycast/api";
import toml from "toml";

export interface Configuration {
  classNames: string[];
  branchTemplates: string[];
  rootTemplates: string[];
}

export function read(projectPath: string): Configuration {
  try {
    const content = fs.readFileSync(path.join(projectPath, "kiwi.toml"), "utf8");
    const templatesFolder = path.join(projectPath, "templates");
    const values = toml.parse(content);
    return {
      classNames: values.classes.map((v: { name: string }) => v.name),
      branchTemplates: fs.readdirSync(path.join(templatesFolder, "branch")),
      rootTemplates: fs.readdirSync(path.join(templatesFolder, "root")),
    };
  } catch (err) {
    console.error(err);
    showToast(ToastStyle.Failure, "Failed to read from configuration file");
  }
  return { classNames: [], branchTemplates: [], rootTemplates: [] };
}
