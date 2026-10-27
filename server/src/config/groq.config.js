const { ChatGroq } = require("@langchain/groq");

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL,
  temperature: 0.7,
});

module.exports = groq;