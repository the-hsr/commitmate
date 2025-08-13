import * as vscode from "vscode";
import { commandRegistrations } from "./commandRegistrations";

export function registerCommands(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        ...commandRegistrations.map(({ id, handler }) => 
            vscode.commands.registerCommand(id, handler)
        )
    );
}