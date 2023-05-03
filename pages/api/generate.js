//npm i dotenv
import * as dotenv from "dotenv";
//configure the directory to key
dotenv.config({ path: __dirname + "/.env" });

console.log(".env file: " + process.env);

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//npm install openai
const openai = new OpenAIApi(configuration);

export default async function finder(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error:
        // "OpenAI key not configured",
        {
          message: "OpenAI key not configured",
        },
    });
    return;
  }
  const animal = req.body.animal || "";
  //if the user does not enter anything
  //trim gets rid of all white space in string
  if (animal.trim().length === 0) {
    res.status(400).json({
      // error: {
      //   message: "Please enter a valid animal.",
      // },
      error: "Please enter a valid animal.",
    });
    return;
  }
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `suggest three pet names for the following ${animal}.`,
      //temp is randomness
      temperature: 0.8,
      //max tokens is responses
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.status(200).json({
      result: response.data.choices[0].text,
    });
  } catch (e) {
    if (e.response) {
      console.log(e(e.response.status, e.response.data));
      res.status(e.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${e.message}`);
      res.status(500).json({
        error: "An error occurred during request",
      });
    }
  }
}
