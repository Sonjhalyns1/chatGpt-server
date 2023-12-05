const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiUrl = "https://api.openai.com//v1/chat/completions"; // Adjust the API endpoint as needed

// Setup server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      apiUrl,
      await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      })
    );

    res.send(response.data.choices[0].text);
  } catch (error) {
    console.error("Error from OpenAI API:", error.response ? error.response.data : error.message);
    res.status(500).send("Error from OpenAI API");
  }
});

const PORT = 8020;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

