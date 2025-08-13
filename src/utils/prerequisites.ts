import * as vscode from "vscode";
import { Messages } from "../constants/messages";
import { isGitAvailable, showError } from "../utils/vscodeUtils";
import { ApiKeyService } from "../services/apiKeyService";

export async function checkPrerequisites(context: vscode.ExtensionContext): Promise<boolean> {
    if (!(await isGitAvailable())) {
        showError(Messages.GIT_NOT_FOUND);
        return false;
    }

    const apiKey = await ApiKeyService.getApiKey(context);
    if (!apiKey) {
        showError(Messages.GROQ_API_KEY_REQUIRED);
        return false;
    }

    return true;
}