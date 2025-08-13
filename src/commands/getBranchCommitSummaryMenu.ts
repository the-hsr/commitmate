import * as vscode from "vscode";

import { showBranchCommitsSummary } from "./showBranchCommitsSummary";
import { showAuthorSpecificCommits } from "./showAuthorSpecificCommits";
import { Messages } from "../constants/messages";
import { getApiKeyOrShowError } from "../utils/apiKeyUtils";

export async function getBranchCommitSummaryMenu(context: vscode.ExtensionContext) {
  const apiKey = await getApiKeyOrShowError();
  if (!apiKey) return;

  const choice = await vscode.window.showQuickPick(
    [
      { label: Messages.MENU_BRANCH_COMMITS_SUMMARY_LABEL, description: Messages.MENU_BRANCH_COMMITS_SUMMARY_DESC },
      { label: Messages.MENU_AUTHOR_SPECIFIC_COMMITS_LABEL, description: Messages.MENU_AUTHOR_SPECIFIC_COMMITS_DESC },
    ],
    { placeHolder: Messages.MENU_PLACEHOLDER }
  );

  if (!choice) return;

  if (choice.label === Messages.MENU_BRANCH_COMMITS_SUMMARY_LABEL) {
    await showBranchCommitsSummary(context);
  } else if (choice.label === Messages.MENU_AUTHOR_SPECIFIC_COMMITS_LABEL) {
    await showAuthorSpecificCommits(context);
  }
}