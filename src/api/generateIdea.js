import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // ✅ This line must use the env variable
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Give me a fresh trending content idea for Instagram or YouTube.",
        },
      ],
    });

    const idea = completion.data.choices[0].message.content;
    res.status(200).json({ idea });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({ error: "Error generating idea. Check your API key." });
  }
}
