import * as vscode from "vscode";

export class ApiKeyService {
    static async getApiKey(context: vscode.ExtensionContext): Promise<string | undefined> {
        let apiKey = await context.secrets.get("groqApiKey");

        if (!apiKey) {
            apiKey = await vscode.window.showInputBox({
                prompt: "Enter your Groq API Key (Can be found at: https://console.groq.com/keys)",
                ignoreFocusOut: true,
                password: true
            });

            if (apiKey) {
                await context.secrets.store("groqApiKey", apiKey.trim());
                vscode.window.showInformationMessage("Groq API key saved successfully!");
            }
        }

        return apiKey;
    }
}