
const groq = require("../../../config/groq.config");

const generateResponse = async (messages) => {
  return groq.invoke(messages, {
    timeout: 30000,
  });
};



const streamResponse = async (messages , signal) => {
  return groq.stream(messages, {
    timeout: 30000,
    signal
  });
};


module.exports = {
  generateResponse,
  streamResponse
};
 