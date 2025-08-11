export function formatCommitMessage(commitType: string, commitMessage: string): string {
    const firstBullet = commitMessage.split("\n").find(line => line.trim().startsWith("-")) || "";
    const titleWords = firstBullet.replace(/^-/, "").trim().split(/\s+/).slice(0, 3).join("-");
    
    const formattedTitle = titleWords
        ? `${commitType}/${titleWords.toLowerCase()}:`
        : `${commitType}:`;
    
    return `${formattedTitle}\n${commitMessage}`;
}