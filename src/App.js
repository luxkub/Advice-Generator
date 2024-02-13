import React, { useState, useEffect } from 'react';
import './styles.css';

const api = "https://api.adviceslip.com/advice";

function App() {
  const [advice, setAdvice] = useState({ id: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAdvice();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const getAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch(api, { cache: "no-cache" });
      const data = await response.json();

      const { id, advice } = data.slip;

      setAdvice({ id, text: advice });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleGenerateAdvice = () => {
    getAdvice();
  };

  return (
    <main className="advice">
      <p className="number">Advice # {advice.id}</p>
      <q className="blurb">{advice.text}</q>
      <p className="loading" hidden={!loading}>Loading new advice...</p>
      <button className="adviceBtn" onClick={handleGenerateAdvice}>Generate more advice!</button>
    </main>
  );
}

export default App;