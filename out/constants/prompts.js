"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompts = void 0;
exports.Prompts = {
    COMMIT_MESSAGE: (diff) => `
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
${diff}
`,
};
//# sourceMappingURL=prompts.js.map