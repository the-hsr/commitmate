export const Prompts = {
  SHORT_TITLE_MESSAGE: (text: String) => `
  Summarize the following commit description into 2-3 short, clear words for a commit title.
  Avoid special characters, just lowercase hyphen-separated words.
  Input: "${text}"
  `,

  COMMIT_MESSAGE: (diff: string) => `
  You are an AI that writes concise Git commit messages.

  Rules:
  - If the changes are minimal (1-2 small changes), output ONLY a single short line.
  - If the changes are significant, output Maximum 4-5 bullet points.
  - Each bullet point must start with "- ".
  - Do NOT include any introductions, explanations, summaries, or phrases like:
  "Here is the commit message", "Commit message:", "In bullet points:", or similar.
  - Do NOT wrap output in quotes or code blocks.
  - Output only the commit content, nothing else.
  - Use clear, concise, developer-friendly language.

  Changes to summarize:
  ${diff}`,

  BRANCH_SUMMARY: (commitsLog: string) => `
  You are an expert at summarizing Git commit history.
  The input is a raw commit log in the format "<hash> <message> (<author>)".
  Your task:
  - Ignore commit IDs, hashes, and author names.
  - Do not include dates.
  - Write a clean, concise summary of the branch's work so far.
  - Use bullet points, each describing a meaningful change or feature.
  - Focus only on the *intent* of the change, not its technical details.
  - Be clear and easy to scan.

  Commits log:
  ${commitsLog}
  `.trim(),

  AUTHOR_SPECIFIC_BRANCH_SUMMARY: (commitsLog: string, currentUser: string) => `
  You are a helpful git history summarizer.

  Your task is to read a git commit log and produce a clear, concise, and informative summary grouped by author.

  Rules:
  1. Group commits by author name.
  2. Replace the current user’s name "${currentUser}" with "You".
  3. Do not include any commit hashes, commit IDs, or timestamps.
  4. Ignore any "unknown" authors. Do not include empty author sections.
  5. For each commit, write a short but clear 1–2 sentence description explaining WHAT was changed and, if possible, WHY it was changed, based only on the commit message.
  6. Expand vague commit messages (e.g., "fix bug", "update docs") into meaningful descriptions while staying true to the original intent.
  7. Use bullet points under each author for their commits.
  8. Keep the tone professional and easy to read.
  9. Output must be clean, without additional commentary or filler text.
  10. Keep the tone professional and easy to read.
  11. Do not add commentary, explanations, or meta-notes about the commits (e.g., avoid saying “only one commit” or “since there are few commits”).
  12. Author names should be plain text — no asterisks, bold, italics, or other formatting.

  Git commit log:
  ${commitsLog}`,

  MERGE_REQUEST_TEMPLATE: (commitsLog: string, usersInput: string) => `
  Generate a concise and professional Merge Request template.

  Rules:
  - Do NOT include any author names, emails, or personal identifiers.
  - Base the description entirely on the commit logs provided.
  - Follow the "What, How, Why" format:
    - **What**: Summarize the key changes from the commits.
    - **How**: Explain the main implementation approach.
    - **Why**: Describe the reason and motivation for the changes.
  - Write clearly and in bullet points where appropriate.
  - Keep it professional and neutral in tone.
  - If the user provided additional specifics, incorporate them appropriately.

  Commit Logs:
  ${commitsLog}

  Additional Specifics from User:
  ${usersInput?.trim() || "None"}
  `
};