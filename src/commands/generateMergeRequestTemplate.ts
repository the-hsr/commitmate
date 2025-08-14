import * as vscode from "vscode";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { showError, showWarning } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";
import { getApiKeyOrShowError } from "../utils/apiKeyUtils";

export async function generateMergeRequestTemplate(context: vscode.ExtensionContext) {
    try {
        const apiKey = await getApiKeyOrShowError();
        if (!apiKey) return;

        const userSpecifics = await vscode.window.showInputBox({
            prompt: Messages.MERGE_REQUEST_TEMPLATE_USER_SPECIFICS,
            placeHolder: Messages.MERGE_REQUEST_TEMPLATE_USER_SPECIFICS_PLACEHOLDER
        });

        const commitsLog = await GitService.getBranchCommits();
        if (!commitsLog.trim()) {
            showWarning(Messages.NO_COMMITS_FOUND);
            return;
        }

        const summary = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: Messages.GENERATING_MERGE_REQUEST_TEMPLATE,
            cancellable: false
        }, async () => {
            return await AiService.generateMergeRequestTemplate(commitsLog, userSpecifics || "");
        });

        if (!summary) {
            showError(Messages.FAILED_TO_GENERATE_MERGE_REQUEST_TEMPLATE);
            return;
        }

        const outputChannel = vscode.window.createOutputChannel(Messages.OUTPUT_MERGE_REQUEST_TEMPLATE);
        outputChannel.clear();
        outputChannel.appendLine(summary);
        outputChannel.show();

    } catch (err: any) {
        showError(Messages.ERROR_GENERATING_MERGE_REQUEST_TEMPLATE(err.message));
    }
}