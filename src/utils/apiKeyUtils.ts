import { ContextService } from "../services/contextService";
import { ApiKeyService } from "../services/apiKeyService";
import { showError } from "./vscodeUtils";
import { Messages } from "../constants/messages";

export async function getApiKeyOrShowError(): Promise<string | undefined> {
    const context = ContextService.getContext();
    const apiKey = await ApiKeyService.getApiKey(context);

    if (!apiKey) {
        showError(Messages.GROQ_API_KEY_REQUIRED);
        return undefined;
    }

    return apiKey;
}