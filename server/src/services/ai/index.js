const groqProvider = require("./providers/groq.provider");
const geminiProvider = require("./providers/gemini.provider");

const providers = {
  groq: groqProvider,
  gemini: geminiProvider,
};

const activeProvider = process.env.AI_PROVIDER || "groq";

const aiService = providers[activeProvider];

if (!aiService) {
  throw new Error(`Unsupported AI provider: ${activeProvider}`);
}

module.exports = aiService;