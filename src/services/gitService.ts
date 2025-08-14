import * as vscode from "vscode";
import { exec } from "child_process";
import { showError } from "../utils/vscodeUtils";
import { Messages } from "../constants/messages";
import { GitCommands } from "../constants/gitCommands";

export class GitService {
    private static getCwd(): string {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            throw new Error(Messages.NO_WORKSPACE_OPEN);
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
        return this.runGitCommand(GitCommands.GIT_DIFF);
    }

    static async getBranchCommits(): Promise<string> {
        return this.runGitCommand(GitCommands.GIT_LOG);
    }

    static async getAuthorSpecificCommits(): Promise<string> {
        return this.runGitCommand(GitCommands.GIT_AUTHOR_LOG);
    }

    static async getCurrentGitUser(): Promise<string> {
        return this.runGitCommand(GitCommands.GIT_CONFIG_USER);
    }

    static async getAllBranches(): Promise<string[]> {
        const output = await this.runGitCommand(GitCommands.GIT_BRANCH);
        return output
            .split("\n")
            .map(line => line.replace(/^[* ]+/, "").trim())
            .map(branch => branch.replace(/^remotes\//, ""))
            .filter((branch, index, arr) => branch && arr.indexOf(branch) === index);
    }

    static async getDiffAgainstBranch(branch: string): Promise<string> {
        return this.runGitCommand(GitCommands.GIT_DIFF_PARENT_BRANCH(branch));
    }
}