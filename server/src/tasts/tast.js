require("dotenv").config();

const groq = require("../config/groq.config")

const testGroq = async () => {
  try {
    const response = await groq.invoke([
      ["human", "Explain what an API is in simple Hinglish."],
    ]);

    console.log("AI Response:", response.content);
  } catch (error) {
    console.error("Groq Error:", error.message);
  }
};

testGroq();