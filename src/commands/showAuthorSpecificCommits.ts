import * as vscode from "vscode";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { showError, showWarning } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";

export async function showAuthorSpecificCommits(context: vscode.ExtensionContext) {
    try {
        const commitsLog = await GitService.getAuthorSpecificCommits();
        if (!commitsLog.trim()) {
            showWarning(Messages.NO_COMMITS_FOUND);
            return;
        }

        const summary = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: Messages.GENERATING_AUTHOR_SUMMARY,
            cancellable: false
        }, async () => {
            return await AiService.generateAuthorSpecificBranchSummary(commitsLog);
        });

        if (!summary) {
            showError(Messages.AUTHOR_SUMMARY_FAILED);
            return;
        }

        const outputChannel = vscode.window.createOutputChannel(Messages.OUTPUT_AUTHOR_SUMMARY);
        outputChannel.clear();
        outputChannel.appendLine(summary);
        outputChannel.show();

    } catch (err: any) {
        showError(Messages.AUTHOR_SUMMARY_ERROR(err.message));
    }
}