import * as vscode from "vscode";
import { generateCommitMessage } from "./commands/generateCommitMessage";
import { getAllCommitsOverview } from "./commands/getAllCommitsOverview";
import { Commands } from "./constants/commands";
import { isGitAvailable, showError } from "./utils/vscodeUtils";


export async function activate(context: vscode.ExtensionContext) {
    if (!(await isGitAvailable())) {
    showError("Git is not installed or not found in PATH. Please install Git to use CommitMate.");
    return;
  }
    context.subscriptions.push(
        vscode.commands.registerCommand(
            Commands.GENERATE_COMMIT_MESSAGE,
            () => generateCommitMessage(context)
        ),
        vscode.commands.registerCommand(
            Commands.GET_ALL_COMMITS_OVERVIEW,
            () => getAllCommitsOverview(context)
        )
    );
}

export function deactivate() {}