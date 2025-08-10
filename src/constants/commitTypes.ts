export enum CommitType {
  FEAT = "feat",
  BUGFIX = "bugfix",
  HOTFIX = "hotfix",
  REFACTOR = "refactor",
  DOCS = "docs",
  CHORE = "chore",
}

// For use in UI elements like QuickPick
export const commitTypeList: string[] = Object.values(CommitType);