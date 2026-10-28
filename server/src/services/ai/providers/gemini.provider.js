const gemini = require("../../../config/gemini.config");



const generateResponse = async (messages) => {
  return gemini.invoke(messages, {
    timeout: 30000,
  });
};

const streamResponse = async (messages,signal) => {
  return gemini.stream(messages, {
    timeout: 30000,
    signal
  });
};

module.exports = {
  generateResponse,
  streamResponse
};