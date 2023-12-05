// import {Configuration, OpenAIApi } from "openai";
// require('dotenv').config();

// const apiKey = process.env.API_KEY;
// const organizationKey = process.env.ORGANIZATION_KEY
// const configuration = new Configuration({
//   organization :`${organizationKey}`,
//   apiKey: `${apiKey}`,
// })
// const openai = new OpenAIApi(configuration);

// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{role: "user", content: "hello world"}]
// })

// console.log(completion.data.choices[0].message)

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
      {
        prompt: prompt,
        max_tokens: 512,
        
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
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

