export enum CommitType {
  FEAT = "feat",
  BUGFIX = "bugfix",
  HOTFIX = "hotfix",
  REFACTOR = "refactor",
  DOCS = "docs",
  CHORE = "chore",
}

export const commitTypeList: string[] = Object.values(CommitType);