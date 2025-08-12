import Groq from "groq-sdk";
import { Prompts } from "../constants/prompts";
import { Config } from "../constants/config";
import {  GitService } from "./gitService";

export class AiService {
    static async generateCommitMessage(apiKey: string, diff: string): Promise<string | undefined> {
        const groq = new Groq({ apiKey });

        const prompt = Prompts.COMMIT_MESSAGE(diff);

        const completion = await groq.chat.completions.create({
            model: Config.DEFAULT_MODEL,
            messages: [
                { role: "system", content: "You are a helpful commit message generator." },
                { role: "user", content: prompt }
            ],
            temperature: Config.TEMPERATURE,
            max_tokens: Config.MAX_TOKENS
        });

        return completion.choices[0]?.message?.content?.trim();
    }

    static async generateBranchSummary(apiKey: string, commitsLog: string): Promise<string | undefined> {
        const groq = new Groq({ apiKey });

        const prompt = Prompts.BRANCH_SUMMARY(commitsLog);

        const completion = await groq.chat.completions.create({
            model: Config.DEFAULT_MODEL,
            messages: [
                { role: "system", content: "You are a helpful git history summarizer." },
                { role: "user", content: prompt }
            ],
            temperature: Config.TEMPERATURE,
            max_tokens: Config.MAX_TOKENS
        });

        return completion.choices[0]?.message?.content?.trim();
    }

    static async generateAuthorSpecificBranchSummary(apiKey: string, commitsLog: string): Promise<string | undefined> {
        const groq = new Groq({ apiKey });
        const currentUser = await GitService.getCurrentGitUser();

        const prompt = Prompts.AUTHOR_SPECIFIC_BRANCH_SUMMARY(commitsLog, currentUser);

        const completion = await groq.chat.completions.create({
            model: Config.DEFAULT_MODEL,
            messages: [
                { role: "system", content: "You are a helpful git history summarizer." },
                { role: "user", content: prompt }
            ],
            temperature: Config.TEMPERATURE,
            max_tokens: Config.MAX_TOKENS
        });

        return completion.choices[0]?.message?.content?.trim();
    }
}