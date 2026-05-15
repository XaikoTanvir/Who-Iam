const axios = require("axios");
module.exports.config = {
  name: "gemini",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Shizuka",
  description: "Chat with Gemini AI",
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 5
};
module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("Please enter a question.", threadID, messageID);
  api.sendMessage("Thinking...", threadID);
  try {
    const response = await axios.get(`https://api.kenliejugarap.com/gemini/?question=${encodeURIComponent(prompt)}`);
    const message = response.data.response;
    return api.sendMessage(message, threadID, messageID);
  } catch (error) {
    return api.sendMessage("Sorry, Gemini is not reachable right now.", threadID, messageID);
  }
};
