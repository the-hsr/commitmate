import * as vscode from "vscode";
import { generateCommitMessage } from "./commands/generateCommitMessage";
import { getBranchCommitSummaryMenu } from "./commands/getBranchCommitSummaryMenu";
import { Commands } from "./constants/commands";
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