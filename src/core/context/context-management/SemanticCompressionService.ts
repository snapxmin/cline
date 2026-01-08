import { Anthropic } from "@anthropic-ai/sdk"
import { ApiConfiguration, ApiProvider } from "@shared/api"
import { SemanticCompressionSettings } from "@shared/SemanticCompressionSettings"
import { buildApiHandler, ApiHandler } from "@api/index"

/**
 * Prompt template for semantic compression
 * This prompt is designed to create a detailed summary that preserves essential context
 */
const COMPRESSION_SYSTEM_PROMPT = `You are an expert at summarizing conversations while preserving essential context for continuing work. Your task is to create a comprehensive summary that captures:

1. **Task Context**: The original task/goal and any modifications to it
2. **Key Decisions**: Important decisions made during the conversation
3. **Technical Details**: Code patterns, file structures, and architectural decisions
4. **Progress**: What has been accomplished and what remains
5. **Recent State**: The current state of work including any pending operations

Guidelines:
- Be thorough but concise - capture the essence without unnecessary verbosity
- Preserve exact file paths, function names, and code snippets that are critical
- Maintain chronological context of how the work progressed
- Include any error states or blockers that were encountered
- Keep the summary factual and actionable

Output your summary in a structured format.`

const COMPRESSION_USER_PROMPT = `Please summarize the following conversation history, preserving all essential context needed to continue the work:

<conversation>
{conversation}
</conversation>

Create a comprehensive summary that would allow someone to continue this task without losing important context.`

export class SemanticCompressionService {
	private settings: SemanticCompressionSettings
	private apiConfiguration: ApiConfiguration | undefined

	constructor(settings: SemanticCompressionSettings, apiConfiguration?: ApiConfiguration) {
		this.settings = settings
		this.apiConfiguration = apiConfiguration
	}

	/**
	 * Updates the semantic compression settings
	 */
	updateSettings(settings: SemanticCompressionSettings) {
		this.settings = settings
	}

	/**
	 * Updates the API configuration
	 */
	updateApiConfiguration(apiConfiguration: ApiConfiguration) {
		this.apiConfiguration = apiConfiguration
	}

	/**
	 * Checks if semantic compression is enabled and properly configured
	 */
	isEnabled(): boolean {
		return (
			this.settings.enabled &&
			this.settings.apiProvider !== undefined &&
			this.settings.modelId !== undefined &&
			this.settings.modelId.trim() !== "" &&
			this.apiConfiguration !== undefined
		)
	}

	/**
	 * Gets the trigger threshold as a decimal (0-1)
	 */
	getTriggerThresholdDecimal(): number {
		return this.settings.triggerThreshold / 100
	}

	/**
	 * Determines how many message pairs to preserve during compression
	 */
	getPreserveRecentMessages(): number {
		return this.settings.preserveRecentMessages
	}

	/**
	 * Builds an API handler for the compression model
	 */
	private buildCompressionApiHandler(): ApiHandler | undefined {
		if (!this.settings.apiProvider || !this.settings.modelId || !this.apiConfiguration) {
			return undefined
		}

		// Build configuration for the compression model using existing credentials
		const compressionConfig: ApiConfiguration = {
			...this.apiConfiguration,
			apiProvider: this.settings.apiProvider,
			apiModelId: this.settings.modelId,
		}

		// Override model-specific settings based on provider
		switch (this.settings.apiProvider) {
			case "anthropic":
				compressionConfig.apiModelId = this.settings.modelId
				break
			case "openai-native":
				compressionConfig.apiModelId = this.settings.modelId
				break
			case "openai":
				compressionConfig.openAiModelId = this.settings.modelId
				break
			case "ollama":
				compressionConfig.ollamaModelId = this.settings.modelId
				break
			case "gemini":
				compressionConfig.apiModelId = this.settings.modelId
				break
			case "deepseek":
				compressionConfig.apiModelId = this.settings.modelId
				break
			case "openrouter":
				compressionConfig.openRouterModelId = this.settings.modelId
				break
			default:
				compressionConfig.apiModelId = this.settings.modelId
		}

		return buildApiHandler(compressionConfig)
	}

	/**
	 * Formats messages into a string representation for compression
	 */
	private formatMessagesForCompression(messages: Anthropic.Messages.MessageParam[]): string {
		const formattedMessages: string[] = []

		for (const message of messages) {
			const role = message.role.toUpperCase()
			let content = ""

			if (typeof message.content === "string") {
				content = message.content
			} else if (Array.isArray(message.content)) {
				// Handle array of content blocks
				const textParts: string[] = []
				for (const block of message.content) {
					if (block.type === "text") {
						textParts.push(block.text)
					} else if (block.type === "tool_use") {
						textParts.push(`[Tool Use: ${block.name}]`)
					} else if (block.type === "tool_result") {
						textParts.push(`[Tool Result]`)
					} else if (block.type === "image") {
						textParts.push("[Image]")
					}
				}
				content = textParts.join("\n")
			}

			formattedMessages.push(`[${role}]\n${content}`)
		}

		return formattedMessages.join("\n\n---\n\n")
	}

	/**
	 * Compresses conversation history using a small model
	 * Returns the compressed summary or undefined if compression fails
	 */
	async compressConversation(
		messages: Anthropic.Messages.MessageParam[],
		startIndex: number,
		endIndex: number,
	): Promise<string | undefined> {
		if (!this.isEnabled()) {
			return undefined
		}

		const apiHandler = this.buildCompressionApiHandler()
		if (!apiHandler) {
			console.error("SemanticCompressionService: Failed to build API handler for compression")
			return undefined
		}

		try {
			// Get the messages to compress
			const messagesToCompress = messages.slice(startIndex, endIndex)
			const formattedConversation = this.formatMessagesForCompression(messagesToCompress)

			// Create the compression prompt
			const compressionPrompt = COMPRESSION_USER_PROMPT.replace("{conversation}", formattedConversation)

			// Call the compression model
			const compressionMessages: Anthropic.Messages.MessageParam[] = [
				{
					role: "user",
					content: compressionPrompt,
				},
			]

			let summary = ""
			const stream = apiHandler.createMessage(COMPRESSION_SYSTEM_PROMPT, compressionMessages)

			for await (const chunk of stream) {
				if (chunk.type === "text") {
					summary += chunk.text
				}
			}

			if (summary.trim().length === 0) {
				console.error("SemanticCompressionService: Compression model returned empty summary")
				return undefined
			}

			return summary.trim()
		} catch (error) {
			console.error("SemanticCompressionService: Error during compression:", error)
			return undefined
		}
	}

	/**
	 * Creates a compressed message that replaces the original messages
	 */
	createCompressedMessage(summary: string): Anthropic.Messages.MessageParam {
		return {
			role: "user",
			content: [
				{
					type: "text",
					text: `[COMPRESSED CONVERSATION SUMMARY]\nThe following is a semantic summary of previous conversation that was compressed to save context window space:\n\n${summary}\n\n[END OF COMPRESSED SUMMARY]`,
				},
			],
		}
	}
}
