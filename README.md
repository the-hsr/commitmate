# CommitMate

🚀 **AI-powered Git assistant for VS Code — generate commit messages, summaries, PR templates, and code reviews with Groq for blazing-fast, intelligent results.**

CommitMate streamlines your Git workflow inside VS Code with **AI-powered commit messages, summaries, PR templates, and automated code reviews**.  
This extension acts as your **AI Git companion**, helping you maintain clean commit history, professional pull requests, and higher-quality code – all without leaving your editor.

***

## ✨ Features

- 🧠 **AI-Generated Commit Messages** — Automatically generates meaningful commit messages from your `git diff`.
- 📏 **Follows Commit Guidelines** — Supports Conventional Commits or your custom style for consistency.
- ⚡ **Groq-Powered** — Uses `llama3-8b-8192` for blazing-fast, context-aware suggestions.
- 🎯 **Adaptive Summaries** — Provides minimal or detailed messages based on the scope of changes.
- 📂 **Source Control Integration** — Accessible directly from the Git side menu for quick commits.
- 📜 **Branch & Author Commit Summaries** — Summarizes commit history (`git log`) scoped by branch or author.
- 📝 **Merge/Pull Request Template Generator** — Creates clear PR/MR templates following the WHAT, HOW, WHY format.
- 🔍 **AI Code Review Assistant** — Reviews your `git diff`, highlights issues, and suggests improvements.
- ♻️ **Extension Reset** — Easily reset API keys and cached data for predictable and secure behavior.
- 🔑 **Customizable API Key & Model** — Configure Groq API key and choose your preferred model via VS Code prompt.

***

## 📦 Installation

1. **Clone the repository:**
   ```shell
   git clone https://github.com/the-hsr/commitmate.git
   cd commitmate
   ```
2. **Install dependencies and compile:**
   ```shell
   npm run build
   ```
3. **Open in VS Code:**
   ```shell
   code .
   ```
4. **Run the extension:**
   - Press `F5` to launch CommitMate in a new VS Code Extension Development Host window.

***

## 🧩 Commands

| Command                                  | Description                                                                 |
|------------------------------------------|-----------------------------------------------------------------------------|
| `commitmate.generateCommitMessage`       | Generate an AI-powered commit message for staged changes.                   |
| `commitmate.branchCommitSummary`         | Summarize commit history for the current branch, scoped by branch or author.|
| `commitmate.mergeRequestTemplate`        | Generate a structured PR/MR template (WHAT, HOW, WHY).                      |
| `commitmate.performCodeReview`           | Perform an AI-powered code review on your staged changes.                   |
| `commitmate.resetExtension`              | Reset API keys and cached data for secure and predictable behavior.         |

***

## 🏗 Architecture & Flow

```plaintext
[VS Code Command]
        │
        ▼
[extension.ts]
        │  (Orchestrates flow)
        ▼
[GitService]───(runs the git command as the user selects the command)───▶
        │
        ▼
[AIService]───(GitService result + prompt to Groq API)───▶
        │
        ▼
[Formatter]───(formats message)───▶
        │
        ▼
[VS Code Git Output Channel] (AI result ready)
```

### Key Modules

- **constants/** — Fixed values (commit types, prompts, config keys)
- **services/** — Core logic (GitService, AIService, ApiKeyService)
- **utils/** — Helper functions (message formatting, validation)
- **extension.ts** — Entry point; connects VS Code commands to services

***

## 🗂 Project Structure

```
commitmate/
├── src/
│   ├── constants/         # All constant values (commit types, prompts, config, etc.)
│   ├── services/          # Business logic (AI service, Git service, etc.)
│   ├── utils/             # Helper functions (message formatting, validation)
│   ├── extension.ts       # VS Code extension entry point
├── package.json           # Extension metadata
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

***

## 📜 Example Generated Commits

**Small change:**
```
fix: correct typo in function name
```

**Larger change:**
```
feat/user-auth:
- Add JWT-based authentication
- Implement refresh token rotation
- Update login API to return expiry timestamp
```

***

## 💡 Contributing

1. Fork the repo
2. Create your branch:  
   ```shell
   git checkout -b feature/my-feature
   ```
3. Commit your changes:  
   ```shell
   git commit -m "feat: add new feature"
   ```
4. Push to the branch:  
   ```shell
   git push origin feature/my-feature
   ```
5. Submit a Pull Request 🎉

***

**Happy committing with CommitMate!**

***

**Note:**  
- Make sure to set your Groq API Key when prompted.
- Open to contributions, bugs, and feature requests!

***
