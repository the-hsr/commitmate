import * as vscode from "vscode";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { showError, showWarning } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";

export async function showBranchCommitsSummary(context: vscode.ExtensionContext) {
    try {
        const commitsLog = await GitService.getBranchCommits();
        if (!commitsLog.trim()) {
            showWarning(Messages.NO_COMMITS_FOUND);
            return;
        }

        const summary = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: Messages.GENERATING_BRANCH_SUMMARY,
            cancellable: false
        }, async () => {
            return await AiService.generateBranchSummary(commitsLog);
        });

        if (!summary) {
            showError(Messages.FAILED_TO_GENERATE_BRANCH_SUMMARY);
            return;
        }

        const outputChannel = vscode.window.createOutputChannel(Messages.OUTPUT_BRANCH_SUMMARY);
        outputChannel.clear();
        outputChannel.appendLine(summary);
        outputChannel.show();

    } catch (err: any) {
        showError(Messages.ERROR_GENERATING_BRANCH_SUMMARY(err.message));
    }
}