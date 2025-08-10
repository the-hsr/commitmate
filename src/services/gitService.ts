import { exec } from "child_process";
import * as vscode from "vscode";

export class GitService {
    static async getStagedDiff(): Promise<string> {
        return new Promise((resolve, reject) => {
            exec("git diff --staged", { cwd: vscode.workspace.rootPath }, (error, stdout) => {
                if (error) reject(error);
                else resolve(stdout);
            });
        });
    }
}