"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const prompts_1 = require("../constants/prompts");
const config_1 = require("../constants/config");
class AiService {
    static async generateCommitMessage(apiKey, diff) {
        const groq = new groq_sdk_1.default({ apiKey });
        const prompt = prompts_1.Prompts.COMMIT_MESSAGE(diff);
        const completion = await groq.chat.completions.create({
            model: config_1.Config.DEFAULT_MODEL,
            messages: [
                { role: "system", content: "You are a helpful commit message generator." },
                { role: "user", content: prompt }
            ],
            temperature: config_1.Config.TEMPERATURE,
            max_tokens: config_1.Config.MAX_TOKENS
        });
        return completion.choices[0]?.message?.content?.trim();
    }
}
exports.AiService = AiService;
//# sourceMappingURL=aiService.js.map