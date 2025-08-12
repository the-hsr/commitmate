import * as vscode from "vscode";
import { generateCommitMessage } from "../commands/generateCommitMessage";
import { getBranchCommitSummaryMenu } from "../commands/getBranchCommitSummaryMenu";
import { Commands } from "../constants/commands";

export function registerCommands(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            Commands.GENERATE_COMMIT_MESSAGE,
            () => generateCommitMessage(context)
        ),
        vscode.commands.registerCommand(
            Commands.BRANCH_COMMIT_SUMMARY,
            () => getBranchCommitSummaryMenu(context)
        )
    );
}