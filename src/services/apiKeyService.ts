import * as vscode from "vscode";

export class ApiKeyService {
    static async getApiKey(context: vscode.ExtensionContext): Promise<string | undefined> {
        let apiKey = context.globalState.get<string>("groqApiKey");

        if (!apiKey) {
            apiKey = await vscode.window.showInputBox({
                prompt: "Enter your Groq API Key",
                ignoreFocusOut: true,
                password: true
            });

            if (apiKey) {
                await context.globalState.update("groqApiKey", apiKey);
                vscode.window.showInformationMessage("Groq API key saved successfully!");
            }
        }

        return apiKey;
    }
}