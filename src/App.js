import React, { useState, useEffect } from 'react';
import './styles.css';

// API endpoint for fetching advice
const api = "https://api.adviceslip.com/advice";

function App() {
  // State variables to hold advice and loading status
  const [advice, setAdvice] = useState({ id: "", text: "" });
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  // useEffect hook to fetch advice when the component mounts
  useEffect(() => {
    getAdvice();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Function to fetch advice from the API
  const getAdvice = async () => {
    setLoading(true); // Set loading state to true when fetching advice
    try {
      const response = await fetch(api, { cache: "no-cache" });
      const data = await response.json();

      // Extract advice ID and text from the response data
      const { id, advice } = data.slip;

      // Update advice state with the fetched advice
      setAdvice({ id, text: advice });
    } catch (error) {
      console.error(error); // Log any errors that occur during fetching
    } finally {
      setLoading(false); // Set loading state to false after advice is fetched or on error
    }
  };

  // Function to handle the "Generate more advice!" button click
  const handleGenerateAdvice = () => {
    getAdvice(); // Call the getAdvice function to fetch new advice
  };

  // JSX structure for rendering the component
  return (
    <main className="advice">
      {/* Display the advice ID */}
      <p className="number">Advice # {advice.id}</p>
      {/* Display the advice text */}
      <q className="blurb">{advice.text}</q>
      {/* Display loading message when advice is being fetched */}
      <p className="loading" hidden={!loading}>Loading new advice...</p>
      {/* Button to trigger fetching of new advice */}
      <button className="adviceBtn" onClick={handleGenerateAdvice}>
        Generate more advice!
      </button>
    </main>
  );
}

export default App;