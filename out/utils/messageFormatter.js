"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCommitMessage = formatCommitMessage;
function formatCommitMessage(commitType, commitMessage) {
    const firstBullet = commitMessage.split("\n").find(line => line.trim().startsWith("-")) || "";
    const titleWords = firstBullet.replace(/^-/, "").trim().split(/\s+/).slice(0, 3).join("-");
    const formattedTitle = `${commitType}/${titleWords.toLowerCase()}:`;
    return `${formattedTitle}\n${commitMessage}`;
}
//# sourceMappingURL=messageFormatter.js.map