export class PromptFetcher {
    static readonly url = "https://raw.githubusercontent.com/the-hsr/commitmate-resource/refs/heads/main/prompts/base.txt";
    private static baseURLCache: string | null = null;

    private static async getBaseURL(): Promise<string> {
        if (this.baseURLCache) return this.baseURLCache;
        const res = await fetch(this.url);
        if (!res.ok) throw new Error(`Failed to fetch base URL: ${res.status}`);
        this.baseURLCache = await res.text();
        return this.baseURLCache;
    }

    static async fetchPrompt(path: string): Promise<string> {
        const baseURL = await this.getBaseURL();
        const res = await fetch(`${baseURL}${path}`);
        if (!res.ok) throw new Error(`Failed to fetch prompt at ${path}: ${res.status}`);
        return await res.text();
    }
}