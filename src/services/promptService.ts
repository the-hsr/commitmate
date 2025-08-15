import { prompt } from "../constants/promptPaths"; 

export class PromptService {
    static readonly url = "https://raw.githubusercontent.com/the-hsr/commitmate-resource/refs/heads/main/prompts/base.txt";
    private static baseURLCache: string | null = null;

    private static async getBaseURL(): Promise<string> {
        if (this.baseURLCache) return this.baseURLCache;
        const res = await fetch(this.url);
        if (!res.ok) throw new Error(`Failed to fetch base URL: ${res.status}`);
        this.baseURLCache = await res.text();
        return this.baseURLCache;
    }

    private static async fetchPrompt(path: string): Promise<string> {
        const baseURL = await this.getBaseURL();
        const res = await fetch(`${baseURL}${path}`);
        if (!res.ok) throw new Error(`Failed to fetch prompt at ${path}: ${res.status}`);
        return await res.text();
    }

    private static async buildPrompt(path: string, replacements: Record<string, string>): Promise<string> {
        let template = await this.fetchPrompt(path);
        for (const [key, value] of Object.entries(replacements)) {
            template = template.replace(`{{${key}}}`, value);
        }
        return template;
    }

    // Public prompt builders
    static getCommitMessagePrompt() {
        return this.fetchPrompt(prompt.commitMessage);
    }

    static getShortTitleMessagePrompt() {
        return this.fetchPrompt(prompt.shortTitleMessage);
    }

    static getBranchSummaryMessagePrompt() {
        return this.fetchPrompt(prompt.branchSummaryMessage);
    }

    static getAuthorSpecificBranchSummaryMessagePrompt() {
        return this.fetchPrompt(prompt.authorSpecificBranchSummary);
    }

    static getMergeRequestTemplateMessagePrompt() {
        return this.fetchPrompt(prompt.mergeRequestTemplate);
    }

    static getCodeReviewMessagePrompt() {
        return this.fetchPrompt(prompt.codeReview);
    }

    // Builders with replacements
    static buildCommitMessagePrompt(gitDiff: string) {
        return this.buildPrompt(prompt.commitMessage, { diff: gitDiff });
    }

    static buildShortTitleMessagePrompt(commitContent: string) {
        return this.buildPrompt(prompt.shortTitleMessage, { text: commitContent });
    }

    static buildBranchSummaryPrompt(commitsLog: string) {
        return this.buildPrompt(prompt.branchSummaryMessage, { commitsLog });
    }

    static buildAuthorSpecificBranchSummaryPrompt(commitsLog: string, currentUser: string) {
        return this.buildPrompt(prompt.authorSpecificBranchSummary, { commitsLog, currentUser });
    }

    static buildMergeRequestTemplatePrompt(commitsLog: string, usersInput: string) {
        return this.buildPrompt(prompt.mergeRequestTemplate, { commitsLog, usersInput });
    }

    static buildCodeReviewPrompt(diff: string) {
        return this.buildPrompt(prompt.codeReview, { diff });
    }
}