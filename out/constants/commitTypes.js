"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitTypeList = exports.CommitType = void 0;
var CommitType;
(function (CommitType) {
    CommitType["FEAT"] = "feat";
    CommitType["BUGFIX"] = "bugfix";
    CommitType["HOTFIX"] = "hotfix";
    CommitType["REFACTOR"] = "refactor";
    CommitType["DOCS"] = "docs";
    CommitType["CHORE"] = "chore";
})(CommitType || (exports.CommitType = CommitType = {}));
// For use in UI elements like QuickPick
exports.commitTypeList = Object.values(CommitType);
//# sourceMappingURL=commitTypes.js.map