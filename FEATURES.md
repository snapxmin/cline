# Cline Features Documentation

This document provides a comprehensive overview of all features implemented in the Cline VS Code extension.

## Overview

Cline is an autonomous AI coding assistant that can use your **CLI** a**N**d **E**ditor. It leverages Claude 3.7 Sonnet's agentic coding capabilities to handle complex software development tasks step-by-step with human oversight.

## Core Features

### 1. File Management
- **Create Files**: Generate new files with specified content
- **Edit Files**: Modify existing files with diff view for review
- **Delete Files**: Remove files when needed
- **Read Files**: Access and analyze file contents
- **File Timeline**: All changes are tracked in VS Code's Timeline feature
- **Diff View**: Review changes before accepting them
- **Linter/Compiler Monitoring**: Automatically detects and fixes errors like missing imports and syntax errors

### 2. Terminal Integration
- **Command Execution**: Run commands directly in your terminal with your permission
- **Output Monitoring**: Receive real-time feedback from command execution
- **Background Processes**: Support for long-running processes like dev servers with "Proceed While Running" option
- **Shell Integration**: Uses VS Code v1.93+ shell integration API
- **Terminal Output Streaming**: Continuous monitoring of terminal output during task execution
- **Multi-platform Support**: Works across different operating systems and shells

### 3. Browser Automation
- **Headless Browser**: Launch and control a browser for web development tasks
- **Interactive Actions**: Click, type, scroll, and navigate web pages
- **Screenshot Capture**: Take screenshots at each step for debugging
- **Console Log Monitoring**: Capture and analyze browser console output
- **Runtime Error Debugging**: Fix visual bugs and runtime issues autonomously
- **End-to-End Testing**: Perform comprehensive testing of web applications
- **Computer Use**: Leverages Claude 3.5 Sonnet's Computer Use capability

### 4. Code Analysis
- **File Structure Analysis**: Understand project organization
- **AST Parsing**: Analyze source code Abstract Syntax Trees
- **Regex Searches**: Find patterns across the codebase
- **Context Management**: Intelligently manage information in context window
- **Large Project Support**: Handle complex codebases without overwhelming context

### 5. Model Context Protocol (MCP)
- **Custom Tool Creation**: Create tailored tools for specific workflows
- **MCP Server Management**: Install and manage MCP servers
- **Community Servers**: Use pre-built community MCP servers
- **Tool Extension**: Extend Cline's capabilities dynamically
- **Workflow Integration**: Integrate with external services (Jira, AWS, PagerDuty, etc.)
- **MCP Marketplace**: Access and install tools from the marketplace

### 6. Checkpoints System
- **Workspace Snapshots**: Automatic snapshots at each step
- **Compare Feature**: View diffs between snapshots and current workspace
- **Restore Workspace**: Roll back to previous states
- **Restore Task and Workspace**: Revert both task state and code changes
- **Safe Exploration**: Try different approaches without losing progress
- **Git-based**: Uses git under the hood for version control

### 7. Context Enhancement
- **@url**: Fetch and convert URLs to markdown for documentation
- **@problems**: Add workspace errors and warnings for fixing
- **@file**: Include file contents directly (with fuzzy search)
- **@folder**: Add entire folder contents at once
- **Image Support**: Upload images for mockup conversion or bug screenshots
- **Markdown Conversion**: Automatic conversion of various content types

### 8. Multi-Model Support

#### API Providers
- **OpenRouter**: Access to latest models with automatic model list updates
- **Anthropic**: Direct integration with Claude models
- **OpenAI**: Support for GPT models
- **Google Gemini**: Google's AI models
- **AWS Bedrock**: Amazon's managed AI service
- **Azure OpenAI**: Microsoft's AI platform
- **GCP Vertex AI**: Google Cloud's AI platform
- **VS Code Language Models**: Integration with VS Code's built-in LM API
- **Custom OpenAI-compatible APIs**: Configure any compatible endpoint
- **Local Models**: LM Studio and Ollama support

#### Model-Specific Features
- **Token Tracking**: Monitor token usage per request and total
- **Cost Tracking**: Track API costs in real-time
- **Model Selection**: Choose from available models per provider
- **o3-mini Reasoning Effort**: Configurable reasoning levels (low, medium, high)

### 9. User Interface

#### Views
- **Sidebar View**: Access Cline from VS Code sidebar
- **Tab View**: Open Cline in a dedicated editor tab
- **Diff View**: Review file changes side-by-side
- **History View**: Access previous conversations and tasks

#### Controls
- **New Task Button**: Start fresh tasks
- **MCP Servers Button**: Manage MCP integrations
- **History Button**: Browse past tasks
- **Popout Button**: Open in new tab/editor
- **Account Button**: Manage account settings
- **Settings Button**: Configure Cline preferences

#### Interactions
- **Chat Interface**: Natural language interaction
- **Approval System**: Review and approve each action
- **Progress Indicators**: Visual feedback on task progress
- **Keyboard Shortcuts**: Quick access (CMD/CTRL + ')

### 10. Internationalization
- **Multiple Languages**: Support for 15+ languages
  - English
  - Español (Spanish)
  - Deutsch (German)
  - 日本語 (Japanese)
  - 简体中文 (Simplified Chinese)
  - 繁體中文 (Traditional Chinese)
  - 한국어 (Korean)
  - العربية (Arabic)
  - Português (Portuguese - Brazil & Portugal)
  - Čeština (Czech)
  - Français (French)
  - हिन्दी (Hindi)
  - Magyar (Hungarian)
  - Italiano (Italian)
  - Polski (Polish)
  - Русский (Russian)
  - Türkçe (Turkish)

### 11. Development Tools
- **Plan Mode**: Strategic planning before execution
- **Act Mode**: Direct action execution
- **Slash Commands**: Quick commands for common actions
- **Remote Browser Support**: Connect to remote browser instances
- **Custom Chrome Path**: Configure custom Chrome executable location

### 12. Safety & Privacy
- **Human-in-the-Loop**: Approve every file change and terminal command
- **Permission System**: Explicit approval for each action
- **Local Execution**: Code runs in your local environment
- **No Automatic Commits**: Manual control over version control
- **Secure API Handling**: Safe management of API credentials
- **Browser Isolation**: Sandboxed browser sessions

### 13. Integration Features
- **VS Code Integration**: Deep integration with VS Code features
- **Git Timeline**: Changes tracked in VS Code's file timeline
- **Problems Panel**: Integration with VS Code diagnostics
- **Terminal Integration**: Uses VS Code's terminal API
- **Editor Commands**: Context menu additions
- **Selection Tools**: Add selected code to Cline chat
- **Command Palette**: Accessible via VS Code command palette

### 14. Advanced Capabilities
- **Agentic Workflow**: Multi-step autonomous task execution
- **Error Recovery**: Self-correction when encountering errors
- **Iterative Development**: Refine solutions based on feedback
- **Testing Support**: Run and analyze test results
- **Deployment Assistance**: Help with deployment tasks
- **Database Management**: Execute database operations
- **Package Management**: Install and manage dependencies
- **Build System Integration**: Work with build tools and scripts

### 15. Monitoring & Observability
- **Real-time Output**: Monitor command execution in real-time
- **Error Detection**: Automatic detection of compilation and runtime errors
- **Console Monitoring**: Track browser console for web development
- **Performance Tracking**: Monitor API usage and costs
- **Task History**: Complete record of all tasks and conversations

## Configuration Options

### Extension Settings
- **Enable Checkpoints**: Toggle workspace snapshots (default: true)
- **Disable Browser Tool**: Disable browser automation (default: false)
- **Chrome Executable Path**: Custom path to Chrome
- **Preferred Language**: UI language selection
- **MCP Marketplace**: Enable/disable MCP marketplace
- **VS Code LM Model Selector**: Configure VS Code language model settings
- **o3-mini Reasoning Effort**: Control reasoning depth for o3-mini model

## Use Cases

1. **Mockup to App**: Convert design mockups to functional applications
2. **Bug Fixing**: Fix bugs using screenshots and error logs
3. **Code Refactoring**: Improve code structure and quality
4. **Feature Implementation**: Build new features from requirements
5. **Testing**: Create and run automated tests
6. **Documentation**: Generate and update documentation
7. **Deployment**: Assist with deployment processes
8. **Database Tasks**: Manage database schemas and queries
9. **API Integration**: Integrate external APIs and services
10. **Performance Optimization**: Identify and fix performance issues

## Architecture

- **Extension Host**: Main VS Code extension process
- **Webview UI**: React-based user interface
- **MCP Integration**: Model Context Protocol support
- **Browser Controller**: Puppeteer-based browser automation
- **Terminal Controller**: VS Code terminal integration
- **File System**: Safe file operations with diff preview
- **Git Integration**: Checkpoint system using git

## Dependencies

### Key Technologies
- **TypeScript**: Main development language
- **React**: UI framework (webview)
- **Puppeteer**: Browser automation
- **Tree-sitter**: Code parsing
- **Anthropic SDK**: Claude API integration
- **OpenAI SDK**: GPT API integration
- **Google AI SDK**: Gemini integration
- **AWS SDK**: Bedrock integration
- **MCP SDK**: Model Context Protocol

## Version Information

- **Current Version**: 3.14.0
- **VS Code Version Required**: ^1.84.0
- **License**: Apache 2.0

## Links

- **Marketplace**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
- **Documentation**: [docs.cline.bot](https://docs.cline.bot)
- **GitHub**: [github.com/cline/cline](https://github.com/cline/cline)
- **Discord**: [discord.gg/cline](https://discord.gg/cline)
- **Reddit**: [r/cline](https://www.reddit.com/r/cline/)
- **Website**: [cline.bot](https://cline.bot)

---

*Last Updated: 2025-12-29*
