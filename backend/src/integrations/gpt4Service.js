const { Configuration, OpenAIApi } = require("openai");
const { authToken } = require("../config");

const configuration = new Configuration({
  apiKey: authToken,
});

const openai = new OpenAIApi(configuration);

const generateText = async (prompt, maxTokens = 150) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-004",
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: 0.7,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error in generating text with GPT-4: ", error);
    throw error;
  }
};

module.exports = {
  generateText,
};