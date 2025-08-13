import * as vscode from "vscode";
import { checkPrerequisites } from "./utils/prerequisites";
import { registerCommands } from "./utils/registerCommands";
import { ContextService } from "./services/contextService";


export async function activate(context: vscode.ExtensionContext) {
    ContextService.setContext(context);

    if (!(await checkPrerequisites(context))) {
        return;
    }

    registerCommands(context);
}

export function deactivate() {}