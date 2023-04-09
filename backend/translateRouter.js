const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Translate the following text from English to "${targetLanguage}": "${text}"`,
        },
      ],
    });
    const translatedText = completion.data.choices[0].message?.content;
    res.json({ translatedText });
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).send("Translation failed");
  }
});

module.exports = router;
