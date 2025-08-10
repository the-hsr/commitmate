"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommitMessage = generateCommitMessage;
const vscode = __importStar(require("vscode"));
const apiKeyService_1 = require("../services/apiKeyService");
const gitService_1 = require("../services/gitService");
const aiService_1 = require("../services/aiService");
const messageFormatter_1 = require("../utils/messageFormatter");
const vscodeUtils_1 = require("../utils/vscodeUtils");
// Import Constants
const commitTypes_1 = require("../constants/commitTypes");
const messages_1 = require("../constants/messages");
async function generateCommitMessage(context) {
    try {
        const apiKey = await apiKeyService_1.ApiKeyService.getApiKey(context);
        if (!apiKey)
            return;
        const diff = await gitService_1.GitService.getStagedDiff();
        if (!diff.trim()) {
            (0, vscodeUtils_1.showInfo)(messages_1.Messages.NO_STAGED_CHANGES);
            return;
        }
        const commitType = await vscode.window.showQuickPick(commitTypes_1.commitTypeList, { placeHolder: "Select commit type" });
        if (!commitType) {
            (0, vscodeUtils_1.showWarning)(messages_1.Messages.COMMIT_TYPE_NOT_SELECTED);
            return;
        }
        const commitContent = await aiService_1.AiService.generateCommitMessage(apiKey, diff);
        if (!commitContent) {
            (0, vscodeUtils_1.showError)(messages_1.Messages.NO_COMMIT_MESSAGE);
            return;
        }
        const finalMessage = (0, messageFormatter_1.formatCommitMessage)(commitType, commitContent);
        await vscode.env.clipboard.writeText(finalMessage);
        const outputChannel = vscode.window.createOutputChannel("AI Commit Message");
        outputChannel.clear();
        outputChannel.appendLine(finalMessage);
        outputChannel.show();
        (0, vscodeUtils_1.showInfo)(messages_1.Messages.COMMIT_MESSAGE_SUCCESS(finalMessage.split("\n")[0]));
    }
    catch (err) {
        (0, vscodeUtils_1.showError)(`Error: ${err.message}`);
    }
}
//# sourceMappingURL=generateCommitMessage.js.map