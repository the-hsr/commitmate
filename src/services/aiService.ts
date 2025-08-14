import Groq from "groq-sdk";
import { Prompts } from "../constants/prompts";
import { Config } from "../constants/config";
import { GitService } from "./gitService";
import { Messages } from "../constants/messages";
import { isInternetAvailable, showError } from "../utils/vscodeUtils";
import { ContextService } from "./contextService";
import { getApiKeyOrShowError } from "../utils/apiKeyUtils";

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
        return this.generateResponse(
            Prompts.COMMIT_MESSAGE(diff)
        );
    }

    static async generateShortTitleMessage(commitsContent: string) {
        return this.generateResponse(
            Prompts.SHORT_TITLE_MESSAGE(commitsContent)
        );
    }

    static async generateBranchSummary(commitsLog: string) {
        return this.generateResponse(
            Prompts.BRANCH_SUMMARY(commitsLog)
        );
    }

    static async generateAuthorSpecificBranchSummary(commitsLog: string) {
        const currentUser = await GitService.getCurrentGitUser();
        return this.generateResponse(
            Prompts.AUTHOR_SPECIFIC_BRANCH_SUMMARY(commitsLog, currentUser)
        );
    }

    static async generateMergeRequestTemplate(commitsLog: string, usersInput: string) {
        return this.generateResponse(
            Prompts.MERGE_REQUEST_TEMPLATE(commitsLog, usersInput)
        );
    }

    static async performCodeReview(diff: string) {
        return this.generateResponse(
            Prompts.CODE_REVIEW(diff)
        );
    }
}