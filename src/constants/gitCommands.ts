export const GitCommands = {
    GIT_DIFF: "git diff --staged",
    GIT_LOG: "git log --pretty=format:\"%h %s (%an)\"",
    GIT_BRANCH: "git branch --all --no-color",
    GIT_CONFIG_USER: "git config user.name",
    GIT_AUTHOR_LOG: "git log --pretty=format:\"%an: %s\"",
    GIT_DIFF_PARENT_BRANCH: (branch: string) => `git diff ${branch}`
}