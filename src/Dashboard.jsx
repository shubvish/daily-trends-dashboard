import React, { useEffect, useState } from "react";
const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [trends, setTrends] = useState([]);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setNews([
        { title: "India Launches New Satellite", link: "#" },
        { title: "Tech Layoffs Continue in 2025", link: "#" },
      ]);
      setTrends(["#AIRevolution", "#LokSabha2025", "#ViralReels"]);
      setQuote("Great things never come from comfort zones. — Anonymous");
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🌐 World & India News</h2>
      {loading ? <p>Loading...</p> : news.map((n, i) => <p key={i}><a href={n.link}>{n.title}</a></p>)}
      <h2>📈 Trending Topics</h2>
      {loading ? <p>Loading...</p> : trends.map((t, i) => <p key={i}>🔹 {t}</p>)}
      <h2>📅 Quote of the Day</h2>
      <p>{quote}</p>
    </div>
  );
};
export default Dashboard;
