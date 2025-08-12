import * as vscode from "vscode";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { showError, showWarning } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";

export async function showAuthorSpecificCommits(context: vscode.ExtensionContext) {
    try {
        // API key should already be set during activate()
        const apiKey = await context.secrets.get("groqApiKey");
        if (!apiKey) {
            showError(Messages.GROQ_API_KEY_NOT_FOUND);
            return;
        }

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
            return await AiService.generateAuthorSpecificBranchSummary(apiKey, commitsLog);
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