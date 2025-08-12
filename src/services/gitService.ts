import * as vscode from "vscode";
import { exec } from "child_process";

export class GitService {
    private static getCwd(): string {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            throw new Error("No workspace is open.");
        }
        return workspaceFolders[0].uri.fsPath;
    }

    static async runGitCommand(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, { cwd: this.getCwd() }, (error, stdout, stderr) => {
                if (error) reject(stderr || error.message);
                else resolve(stdout.trim());
            });
        });
    }

    static async getStagedDiff(): Promise<string> {
        return this.runGitCommand("git diff --staged");
    }

    static async getBranchCommits(): Promise<string> {
        return this.runGitCommand(`git log --pretty=format:"%h %s (%an)"`);
    }

    static async getAuthorSpecificCommits(): Promise<string> {
        return this.runGitCommand(`git log --pretty=format:"%an: %s"`);
    }

    static async getCurrentGitUser(): Promise<string> {
        return this.runGitCommand(`git config user.name`);
    }
}