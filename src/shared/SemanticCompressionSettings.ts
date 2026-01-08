import { ApiProvider } from "./api"

export interface SemanticCompressionSettings {
	// Whether automatic semantic compression is enabled
	enabled: boolean
	// The API provider to use for the compression model
	apiProvider: ApiProvider | undefined
	// The model ID to use for compression (e.g., "claude-3-5-haiku-20241022", "gpt-4o-mini")
	modelId: string | undefined
	// The threshold percentage of context window usage at which to trigger compression (0-100)
	triggerThreshold: number
	// Whether to preserve the most recent N message pairs when compressing
	preserveRecentMessages: number
}

export const DEFAULT_SEMANTIC_COMPRESSION_SETTINGS: SemanticCompressionSettings = {
	enabled: false,
	apiProvider: undefined,
	modelId: undefined,
	triggerThreshold: 80, // Trigger compression at 80% of context window usage
	preserveRecentMessages: 4, // Preserve the last 4 user-assistant message pairs
}
