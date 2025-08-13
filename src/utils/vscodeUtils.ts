import * as vscode from "vscode";
import * as https from 'https';
import { exec } from "child_process";
import { promisify } from "util";

const execp = promisify(exec);

export const showInfo = (msg: string) => vscode.window.showInformationMessage(msg);
export const showWarning = (msg: string) => vscode.window.showWarningMessage(msg);
export const showError = (msg: string) => vscode.window.showErrorMessage(msg);

export async function isGitAvailable(): Promise<boolean> {
  try {
    const { stdout } = await execp("git --version");
    return stdout.toLowerCase().includes("git version");
  } catch {
    return false;
  }
}

export async function isInternetAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
        https.get("https://www.google.com", (res) => {
            resolve(true);
        }).on("error", () => {
            resolve(false);
        });
    });
}