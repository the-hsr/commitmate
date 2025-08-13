export function formatCommitMessage(commitType: string, commitMessage: string, titleWords: string): string {
  const formattedTitle = titleWords
    ? `${commitType}/${titleWords.toLowerCase()}:`
    : `${commitType}:`;

  return `${formattedTitle}\n${commitMessage}`;
}