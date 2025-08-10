export const Messages = {
  NO_STAGED_CHANGES: "No staged changes found.",
  COMMIT_TYPE_NOT_SELECTED: "Commit type not selected.",
  NO_COMMIT_MESSAGE: "No commit message generated.",
  API_KEY_SAVED: "Groq API key saved successfully!",
  COMMIT_MESSAGE_SUCCESS: (title: string) =>
    `Commit message generated as ${title} and copied to clipboard (see 'AI Commit Message' panel).`,
};