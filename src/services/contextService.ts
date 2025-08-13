import * as vscode from "vscode";
import { Messages } from "../constants/messages";

let extensionContext: vscode.ExtensionContext | undefined;

export const ContextService = {
    setContext: (context: vscode.ExtensionContext) => {
        extensionContext = context;
    },
    getContext: (): vscode.ExtensionContext => {
        if (!extensionContext) {
            throw new Error(Messages.EXTENSION_CONTEXT_NOT_INITIALIZED);
        }
        return extensionContext;
    }
};