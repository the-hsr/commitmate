import * as vscode from "vscode";
import { ApiKeyService } from "../services/apiKeyService";
import { GitService } from "../services/gitService";
import { AiService } from "../services/aiService";
import { formatCommitMessage } from "../utils/messageFormatter";
import { showInfo, showWarning, showError } from "../utils/vscodeUtils";

// Import Constants
import { commitTypeList, CommitType } from "../constants/commitTypes";
import { Messages } from "../constants/messages";

export async function getAllCommitsOverview(context: vscode.ExtensionContext) {
    showInfo("Hello from overview");
}