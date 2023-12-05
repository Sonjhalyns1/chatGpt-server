const express = require("express");
const cors = require("cors");
const PORT = 8020;
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
const axios = require("axios");

const apiKey = process.env.API_KEY;

app.post("/completion", async (req, res) => {
  const { question } = req.body; 

  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `You are a conversational chatbot. ${question}` },
    ],
    max_tokens: 100,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": 'application/json',
      },
    });

    const data = response.data;
    res.send(data.choices[0].message.content);

  } catch (error) {
    console.error(error);
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

app.listen(PORT, () => console.log("Your server is running on port " + PORT));



// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// require('dotenv').config();

// const apiKey = process.env.API_KEY;
// const apiUrl = "https://api.openai.com//v1/chat/completions"; // Adjust the API endpoint as needed

// // Setup server
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // endpoint for ChatGPT
// app.post("/chat", async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await axios.post(
//       apiUrl,
//       {
//         prompt: prompt,
//         max_tokens: 512,
        
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     );

//     res.send(response.data.choices[0].text);
//   } catch (error) {
//     console.error("Error from OpenAI API:", error.response ? error.response.data : error.message);
//     res.status(500).send("Error from OpenAI API");
//   }
// });

// const PORT = 8020;

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

