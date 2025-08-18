import * as vscode from "vscode";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { formatCommitMessage } from "../utils/messageFormatter";
import { showInfo, showWarning, showError } from "../utils/vscodeUtils";
import { getApiKeyOrShowError } from "../utils/apiKeyUtils";
import { analytics } from "../services/analyticsService";

// Import Constants
import { commitTypeList, CommitType } from "../constants/commitTypes";
import { Messages } from "../constants/messages";

export async function generateCommitMessage(context: vscode.ExtensionContext) {
    await analytics.sendEvent("generate_commit_message", {
        feature: "commit_message",
        success: true,
    });

    try {
        const apiKey = await getApiKeyOrShowError();
        if(!apiKey) return;

        const diff = await GitService.getStagedDiff();
        if (!diff.trim()) {
            showInfo(Messages.NO_STAGED_CHANGES);
            return;
        }

        const commitType = await vscode.window.showQuickPick(
            commitTypeList, 
            { placeHolder: Messages.SELECT_COMMIT_TYPE }
        ) as CommitType | undefined;

        if (!commitType) {
            showWarning(Messages.COMMIT_TYPE_NOT_SELECTED);
            return;
        }

        const commitContent = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: Messages.GENERATING_COMMIT_MESSAGE,
            cancellable: false
        }, async () => {
            return await AiService.generateCommitMessage(diff);
        });

        if (!commitContent) {
            showError(Messages.NO_COMMIT_MESSAGE);
            return;
        }

        const titleWords = await AiService.generateShortTitleMessage(commitContent);

        const finalMessage = formatCommitMessage(commitType, commitContent, titleWords ?? "");

        await vscode.env.clipboard.writeText(finalMessage);

        const outputChannel = vscode.window.createOutputChannel(Messages.OUTPUT_CHANNEL);
        outputChannel.clear();
        outputChannel.appendLine(finalMessage);
        outputChannel.show();

        showInfo(Messages.COMMIT_MESSAGE_SUCCESS(finalMessage.split("\n")[0]));

    } catch (err: any) {
        showError(Messages.ERROR_GENERATING_COMMIT_MESSAGE(err.message));
    }
}