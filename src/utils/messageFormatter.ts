export function formatCommitMessage(commitType: string, commitMessage: string, titleWords: string): string {
  const shortTitleMessage = titleWords.replace(/\s+/g, "-").toLowerCase();

  const formattedTitle = titleWords
    ? `${commitType}/${shortTitleMessage}:`
    : `${commitType}:`;

  return `${formattedTitle}\n${commitMessage}`;
}