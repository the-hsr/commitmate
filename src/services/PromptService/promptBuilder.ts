import { PromptFetcher } from "./promptFetcher";
import { prompt } from "../../constants/promptPaths"; 

export class PromptBuilder {
    private static async buildPrompt(path: string, replacements: Record<string, string>): Promise<string> {
        let template = await PromptFetcher.fetchPrompt(path);
        for (const [key, value] of Object.entries(replacements)) {
            template = template.replace(`{{${key}}}`, value);
        }
        return template;
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