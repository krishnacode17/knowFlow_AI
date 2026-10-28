const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const gemini = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: process.env.GEMINI_MODEL,
  temperature: 0.7,
  maxRetries: 0,
});


module.exports = gemini