import Groq from "groq-sdk";
import { Prompts } from "../constants/prompts";
import { Config } from "../constants/config";
import {  GitService } from "./gitService";
import { Messages } from "../constants/messages";
import { isInternetAvailable, showError } from "../utils/vscodeUtils";

export class AiService {
    private static groqInstance(apiKey: string) {
        return new Groq({ apiKey });
    }

    private static async generateResponse(
        apiKey: string,
        prompt: string,
        systemMessage: string = Messages.SYSTEM_MESSAGE
    ): Promise<string | undefined> {
        const online = await isInternetAvailable();
        if(!online) {
            showError(Messages.NO_INTERNET_CONNECTION);
            return;
        }

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

    static async generateCommitMessage(apiKey: string, diff: string): Promise<string | undefined> {
        return this.generateResponse(
            apiKey,
            Prompts.COMMIT_MESSAGE(diff)
        );
    }

    static async generateShortTitleMessage(apiKey: string, commitsContent: string) {
        return this.generateResponse(
            apiKey,
            Prompts.SHORT_TITLE_MESSAGE(commitsContent)
        );
    }

    static async generateBranchSummary(apiKey: string, commitsLog: string) {
        return this.generateResponse(
            apiKey,
            Prompts.BRANCH_SUMMARY(commitsLog)
        );
    }

    static async generateAuthorSpecificBranchSummary(apiKey: string, commitsLog: string) {
        const currentUser = await GitService.getCurrentGitUser();
        return this.generateResponse(
            apiKey,
            Prompts.AUTHOR_SPECIFIC_BRANCH_SUMMARY(commitsLog, currentUser)
        );
    }
}