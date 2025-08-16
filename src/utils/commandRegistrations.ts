import { generateCommitMessage } from "../commands/generateCommitMessage";
import { getBranchCommitSummaryMenu } from "../commands/getBranchCommitSummaryMenu";
import { Commands } from "../constants/commands";
import { resetExtension } from "./resetExtension";
import { ContextService } from "../services/contextService";
import { generateMergeRequestTemplate } from "../commands/generateMergeRequestTemplate";
import { performCodeReview } from "../commands/performCodeReview";

export const commandRegistrations = [
    { id: Commands.GENERATE_COMMIT_MESSAGE, handler: () => generateCommitMessage(ContextService.getContext()) },
    { id: Commands.BRANCH_COMMIT_SUMMARY, handler: () => getBranchCommitSummaryMenu(ContextService.getContext()) },
    { id: Commands.RESET_EXTENSION, handler: () => resetExtension(ContextService.getContext()) },
    { id: Commands.MR_TEMPLATE, handler: () => generateMergeRequestTemplate(ContextService.getContext()) },
    { id: Commands.PERFORM_CODE_REVIEW, handler: () => performCodeReview(ContextService.getContext()) },
];