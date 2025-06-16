// /api/generateIdea.js

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Generate a trending short-form content idea with format, hook, and caption.",
          },
        ],
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;

    const idea = {
      trend: "AIRevoLution", // placeholder trend
      format: "Instagram Reel",
      hook: "Did you know AI can do this in 5 seconds?",
      title: "AI in 2025 is Scary Powerful",
      caption: message || "Use this idea to go viral now!",
    };

    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate idea." });
  }
}
