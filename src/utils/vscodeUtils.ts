import * as vscode from "vscode";

export const showInfo = (msg: string) => vscode.window.showInformationMessage(msg);
export const showWarning = (msg: string) => vscode.window.showWarningMessage(msg);
export const showError = (msg: string) => vscode.window.showErrorMessage(msg);