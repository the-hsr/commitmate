import * as vscode from "vscode";
import { generateCommitMessage } from "./commands/generateCommitMessage";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "commitmate.generateCommitMessage",
            () => generateCommitMessage(context)
        )
    );
}

export function deactivate() {}