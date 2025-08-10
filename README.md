# CommitMate

🚀 **AI-powered Git commit message generator for VS Code, using Groq for blazing-fast and intelligent suggestions.**

CommitMate analyzes your staged Git diffs and produces meaningful, concise, and well-structured commit messages following best practices.

***

## ✨ Features

- 🧠 **AI-Generated Commit Messages** — Understands your code changes and summarizes them.
- 📏 **Follows Commit Guidelines** — Supports Conventional Commits or your custom style.
- ⚡ **Groq-Powered** — Uses `llama3-8b-8192` for fast, context-aware summaries.
- 🎯 **Minimal or Detailed** — Smart rules adapt to small or large changes.
- 🔑 **Customizable API Key & Model** — Configure via settings or environment variables.

***

## 📦 Installation

1. **Clone the repository:**
   ```shell
   git clone https://github.com/the-hsr/commitmate.git
   cd commitmate
   ```
2. **Install dependencies and compile:**
   ```shell
   npm install
   npm run compile
   ```
3. **Open in VS Code:**
   ```shell
   code .
   ```
4. **Run the extension:**
   - Press `F5` to launch CommitMate in a new VS Code Extension Development Host window.

***

## 🚀 Usage

1. **Stage your changes in Git:**
   ```shell
   git add .
   ```
2. **Generate Commit Message:**
   - Press `Ctrl+Shift+P` / `Cmd+Shift+P` → **Git Commit AI: Generate Commit Message**
   - _Or_ bind it to a custom keyboard shortcut.
3. **AI will automatically:**
   - Detect the size of your changes.
   - Generate one of:
     - A single concise commit line (for small changes)
     - Up to 4–5 bullet points (for significant changes)
   - The commit message is copied into your Git commit input box.

***

## 🧩 Commands

| Command                            | Description                                      |
|------------------------------------|--------------------------------------------------|
| `commitmate.generateCommitMessage` | Generate an AI commit message for staged changes |

***

## 🏗 Architecture & Flow

```plaintext
[VS Code Command]
        │
        ▼
[extension.ts]
        │  (Orchestrates flow)
        ▼
[GitService]───(gets staged diff)───▶
        │
        ▼
[AIService]───(sends diff + prompt to Groq API)───▶
        │
        ▼
[MessageFormatter]───(formats commit message)───▶
        │
        ▼
[VS Code Git Input Box] (commit message ready)
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