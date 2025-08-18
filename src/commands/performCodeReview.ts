import * as vscode from "vscode";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { showError, showInfo, showWarning } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";
import { getApiKeyOrShowError } from "../utils/apiKeyUtils";
import { analytics } from "../services/analyticsService";

export async function performCodeReview(context: vscode.ExtensionContext) {
    await analytics.sendEvent("perform_code_review", {
        feature: "code_review",
        success: true,
    });

    try {
        const apiKey = await getApiKeyOrShowError();
        if (!apiKey) return;

        const stagedDiff = await GitService.getStagedDiff();
        if (!stagedDiff.trim()) {
            showWarning(Messages.NO_STAGED_CHANGES);
            return;
        }

        const branches = await GitService.getAllBranches();
        let gitDiff = stagedDiff;

        if (branches?.length) {
            const parentBranch = await vscode.window.showQuickPick(branches, {
                placeHolder: Messages.SELECT_PARENT_BRANCH
            });

            if (!parentBranch) {
                showWarning(Messages.NO_PARENT_BRANCH_SELECTED);
            } else {

            const diffAgainstParent = await GitService.getDiffAgainstBranch(parentBranch);
            if (!diffAgainstParent.trim()) {
                showWarning(Messages.NO_CHANGES_FOUND(parentBranch));
                return;
            }
            gitDiff = diffAgainstParent;
        }
        } else {
            showInfo(Messages.NO_BRANCHES_FOUND);
        }

        const summary = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: Messages.PERFORMING_CODE_REVIEW,
            cancellable: false
        }, () => AiService.performCodeReview(gitDiff));

        if (!summary) {
            showError(Messages.FAILED_TO_PERFORM_CODE_REVIEW);
            return;
        }

        const outputChannel = vscode.window.createOutputChannel(Messages.OUTPUT_CODE_REVIEW);
        outputChannel.clear();
        outputChannel.appendLine(summary);
        outputChannel.show();

    } catch (err: any) {
        showError(Messages.ERROR_PERFORMING_CODE_REVIEW(err.message));
    }
}