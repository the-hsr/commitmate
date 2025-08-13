import * as vscode from "vscode";
import { showInfo } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";

export class ApiKeyService {
    static async getApiKey(context: vscode.ExtensionContext): Promise<string | undefined> {
        let apiKey = await context.secrets.get(Messages.GROQ_API_KEY);

        if (!apiKey) {
            const openLink = Messages.GENERATE_KEY;
            const selection = await vscode.window.showInformationMessage(
                Messages.GROQ_API_KEY_REQUIRED,
                openLink
            );

            if (selection === openLink) {
                vscode.env.openExternal(vscode.Uri.parse(Messages.GROQ_API_KEY_URL));
            }

            apiKey = await vscode.window.showInputBox({
                prompt: Messages.ENTER_API_KEY,
                ignoreFocusOut: true,
                password: true
            });

            if (apiKey) {
                await context.secrets.store(Messages.GROQ_API_KEY, apiKey.trim());
                showInfo(Messages.API_KEY_SAVED);
            }
        }

        return apiKey;
    }
}