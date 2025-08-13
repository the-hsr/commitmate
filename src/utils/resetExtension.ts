import * as vscode from "vscode";
import { showInfo } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";

export async function resetExtension(context: vscode.ExtensionContext) {
    const apiKey = await context.secrets.get(Messages.GROQ_API_KEY);
    if (!apiKey) {
        showInfo(Messages.NOTHING_TO_RESET);
        return;
    }

    const confirm = await vscode.window.showWarningMessage(
        Messages.RESET_CONFIRMATION,
        { modal: true },
        "Yes"
    );

    if (confirm !== "Yes") return;

    try {
        await context.secrets.delete(Messages.GROQ_API_KEY);

        showInfo(Messages.RESET_SUCCESS);
    } catch (err: any) {
        vscode.window.showErrorMessage(Messages.FAILED_TO_RESET_EXTENSION(err.message));
    }
}