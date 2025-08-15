import Groq from "groq-sdk";
import { Config } from "../constants/config";
import { GitService } from "./gitService";
import { Messages } from "../constants/messages";
import { isInternetAvailable, showError } from "../utils/vscodeUtils";
import { ContextService } from "./contextService";
import { getApiKeyOrShowError } from "../utils/apiKeyUtils";
import { PromptService } from "./promptService";

export class AiService {
    private static groqInstance(apiKey: string) {
        return new Groq({ apiKey });
    }

    private static async generateResponse(
        prompt: string,
        systemMessage: string = Messages.SYSTEM_MESSAGE
    ): Promise<string | undefined> {
        const online = await isInternetAvailable();
        const context = ContextService.getContext();
        const apiKey = await getApiKeyOrShowError();

        if(!online) {
            showError(Messages.NO_INTERNET_CONNECTION);
            return;
        }

        if (!apiKey) return;

        try {
            const groq = this.groqInstance(apiKey);

            const completion = await groq.chat.completions.create({
                model: Config.DEFAULT_MODEL,
                messages: [
                    { role: "system", content: systemMessage },
                    { role: "user", content: prompt }
                ],
                temperature: Config.TEMPERATURE,
                max_tokens: Config.MAX_TOKENS
            });

            return completion.choices[0]?.message?.content?.trim();
        } catch (err: any) {
            showError(Messages.AI_SERVICE_ERROR(err.message));
            return;
        }
    }

    static async generateCommitMessage(diff: string): Promise<string | undefined> {
            const prompt = await PromptService.buildCommitMessagePrompt(diff);
            return this.generateResponse(prompt);
        }

    static async generateShortTitleMessage(commitsContent: string) {
        const prompt = await PromptService.buildShortTitleMessagePrompt(commitsContent);
        return this.generateResponse(prompt);
    }

    static async generateBranchSummary(commitsLog: string) {
        const prompt = await PromptService.buildBranchSummaryPrompt(commitsLog);
        return this.generateResponse(prompt);
    }

    static async generateAuthorSpecificBranchSummary(commitsLog: string) {
        const currentUser = await GitService.getCurrentGitUser();
        const prompt = await PromptService.buildAuthorSpecificBranchSummaryPrompt(commitsLog, currentUser);
        return this.generateResponse(prompt);
    }

    static async generateMergeRequestTemplate(commitsLog: string, usersInput: string) {
        const prompt = await PromptService.buildMergeRequestTemplatePrompt(commitsLog, usersInput);
        return this.generateResponse(prompt);
    }

    static async performCodeReview(diff: string) {
        const prompt = await PromptService.buildCodeReviewPrompt(diff);
        return this.generateResponse(prompt);
    }
}