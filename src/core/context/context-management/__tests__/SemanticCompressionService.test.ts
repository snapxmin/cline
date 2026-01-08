import { expect } from "chai"
import { SemanticCompressionService } from "../SemanticCompressionService"
import { SemanticCompressionSettings, DEFAULT_SEMANTIC_COMPRESSION_SETTINGS } from "@shared/SemanticCompressionSettings"
import { Anthropic } from "@anthropic-ai/sdk"

describe("SemanticCompressionService", () => {
	describe("isEnabled", () => {
		it("should return false when settings are disabled", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				enabled: false,
			}
			const service = new SemanticCompressionService(settings)

			expect(service.isEnabled()).to.equal(false)
		})

		it("should return false when apiProvider is undefined", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				enabled: true,
				apiProvider: undefined,
				modelId: "gpt-4o-mini",
			}
			const service = new SemanticCompressionService(settings)

			expect(service.isEnabled()).to.equal(false)
		})

		it("should return false when modelId is undefined", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				enabled: true,
				apiProvider: "openai-native",
				modelId: undefined,
			}
			const service = new SemanticCompressionService(settings)

			expect(service.isEnabled()).to.equal(false)
		})

		it("should return false when apiConfiguration is not set", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				enabled: true,
				apiProvider: "openai-native",
				modelId: "gpt-4o-mini",
			}
			const service = new SemanticCompressionService(settings)
			// Note: apiConfiguration is not passed in constructor

			expect(service.isEnabled()).to.equal(false)
		})

		it("should return true when all requirements are met", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				enabled: true,
				apiProvider: "openai-native",
				modelId: "gpt-4o-mini",
			}
			// Using a generic configuration that satisfies the requirement
			// that apiConfiguration is not undefined
			const apiConfig = {
				apiProvider: "openai-native" as const,
				openAiNativeApiKey: "test-key",
			}
			const service = new SemanticCompressionService(settings, apiConfig)

			expect(service.isEnabled()).to.equal(true)
		})

		it("should return false when modelId is empty string", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				enabled: true,
				apiProvider: "openai-native",
				modelId: "",
			}
			const apiConfig = {
				apiProvider: "openai-native" as const,
				openAiNativeApiKey: "test-key",
			}
			const service = new SemanticCompressionService(settings, apiConfig)

			expect(service.isEnabled()).to.equal(false)
		})

		it("should return false when modelId is whitespace only", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				enabled: true,
				apiProvider: "openai-native",
				modelId: "   ",
			}
			const apiConfig = {
				apiProvider: "openai-native" as const,
				openAiNativeApiKey: "test-key",
			}
			const service = new SemanticCompressionService(settings, apiConfig)

			expect(service.isEnabled()).to.equal(false)
		})
	})

	describe("getTriggerThresholdDecimal", () => {
		it("should return the threshold as a decimal", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				triggerThreshold: 80,
			}
			const service = new SemanticCompressionService(settings)

			expect(service.getTriggerThresholdDecimal()).to.equal(0.8)
		})

		it("should handle custom threshold values", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				triggerThreshold: 75,
			}
			const service = new SemanticCompressionService(settings)

			expect(service.getTriggerThresholdDecimal()).to.equal(0.75)
		})
	})

	describe("getPreserveRecentMessages", () => {
		it("should return the number of recent message pairs to preserve", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				preserveRecentMessages: 4,
			}
			const service = new SemanticCompressionService(settings)

			expect(service.getPreserveRecentMessages()).to.equal(4)
		})

		it("should handle custom preserve values", () => {
			const settings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				preserveRecentMessages: 6,
			}
			const service = new SemanticCompressionService(settings)

			expect(service.getPreserveRecentMessages()).to.equal(6)
		})
	})

	describe("updateSettings", () => {
		it("should update the settings", () => {
			const initialSettings: SemanticCompressionSettings = {
				...DEFAULT_SEMANTIC_COMPRESSION_SETTINGS,
				triggerThreshold: 80,
			}
			const service = new SemanticCompressionService(initialSettings)

			expect(service.getTriggerThresholdDecimal()).to.equal(0.8)

			const newSettings: SemanticCompressionSettings = {
				...initialSettings,
				triggerThreshold: 90,
			}
			service.updateSettings(newSettings)

			expect(service.getTriggerThresholdDecimal()).to.equal(0.9)
		})
	})

	describe("createCompressedMessage", () => {
		it("should create a properly formatted compressed message", () => {
			const service = new SemanticCompressionService(DEFAULT_SEMANTIC_COMPRESSION_SETTINGS)
			const summary = "This is a test summary of the conversation."

			const message = service.createCompressedMessage(summary)

			expect(message.role).to.equal("user")
			expect(Array.isArray(message.content)).to.equal(true)

			const content = message.content as Anthropic.TextBlockParam[]
			expect(content.length).to.equal(1)
			expect(content[0].type).to.equal("text")
			expect(content[0].text).to.include("[COMPRESSED CONVERSATION SUMMARY]")
			expect(content[0].text).to.include(summary)
			expect(content[0].text).to.include("[END OF COMPRESSED SUMMARY]")
		})
	})
})
