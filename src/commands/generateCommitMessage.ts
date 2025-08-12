import * as vscode from "vscode";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { formatCommitMessage } from "../utils/messageFormatter";
import { showInfo, showWarning, showError } from "../utils/vscodeUtils";

// Import Constants
import { commitTypeList, CommitType } from "../constants/commitTypes";
import { Messages } from "../constants/messages";

export async function generateCommitMessage(context: vscode.ExtensionContext) {
    try {
        const apiKey = await context.secrets.get("groqApiKey");
        if (!apiKey) {
            showError(Messages.GROQ_API_KEY_NOT_FOUND);
            return;
        }

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
            return await AiService.generateCommitMessage(apiKey, diff);
        });

        if (!commitContent) {
            showError(Messages.NO_COMMIT_MESSAGE);
            return;
        }

        const finalMessage = formatCommitMessage(commitType, commitContent);

        await vscode.env.clipboard.writeText(finalMessage);

        const outputChannel = vscode.window.createOutputChannel(Messages.OUTPUT_CHANNEL);
        outputChannel.clear();
        outputChannel.appendLine(finalMessage);
        outputChannel.show();

        showInfo(Messages.COMMIT_MESSAGE_SUCCESS(finalMessage.split("\n")[0]));

    } catch (err: any) {
        showError(`Error: ${err.message}`);
    }
}