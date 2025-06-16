import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [trends, setTrends] = useState([]);
  const [quote, setQuote] = useState("");
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setNews([
      { title: "India Launches New Satellite", link: "#" },
      { title: "Tech Layoffs Continue in 2025", link: "#" },
    ]);
    setTrends(["#AIRevolution", "#LokSabha2025", "#ViralReels"]);
    setQuote("Great things never come from comfort zones. — Anonymous");
    setIdea({
      trend: "#AIRevolution",
      format: "Instagram Reel",
      hook: "What if AI could do your job 10x faster than you?",
      title: "5 AI Tools That Will Replace Your 9-5 in 2025",
      caption: "Tag a friend who needs to see this 😳 #AIRevolution",
    });
    setLoading(false);
  }, []);

  const generateNewIdea = async () => {
    setGenerating(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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 `, // 👈 Replace this
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content:
                "Give me a trending Instagram Reel idea with: a trend, format, hook, title, and caption. Respond in JSON format with keys: trend, format, hook, title, caption.",
            },
          ],
        }),
      });

      const data = await res.json();
      const text = data.choices[0].message.content;
      const parsed = JSON.parse(text);
      setIdea(parsed);
    } catch (err) {
      alert("Error generating idea. Check your API key.");
      console.error(err);
    }
    setGenerating(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🌐 World & India News</h2>
      {loading ? <p>Loading...</p> : news.map((n, i) => <p key={i}><a href={n.link}>{n.title}</a></p>)}
      <h2>📈 Trending Topics</h2>
      {trends.map((t, i) => <p key={i}>🔹 {t}</p>)}
      <h2>📅 Quote of the Day</h2>
      <p>{quote}</p>
      <h2>🤖 AI Content Idea</h2>
      {idea && (
        <div style={{ background: "#f0f0f0", padding: 10, borderRadius: 8 }}>
          <p><strong>📢 Trend:</strong> {idea.trend}</p>
          <p><strong>🎬 Format:</strong> {idea.format}</p>
          <p><strong>🧲 Hook:</strong> {idea.hook}</p>
          <p><strong>✍️ Title:</strong> {idea.title}</p>
          <p><strong>📝 Caption Idea:</strong> {idea.caption}</p>
        </div>
      )}
      <button onClick={generateNewIdea} style={{ marginTop: 12 }}>
        {generating ? "Generating..." : "🔁 Generate New Idea"}
      </button>
    </div>
  );
};

export default Dashboard;
