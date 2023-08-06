import React, { useState, useEffect } from "react";
import { quotes } from "../data";

const MotivationalQuote = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(
    Math.floor(Math.random() * quotes.length)
  );
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Function to change the quote and set fadeOut to true
    const changeQuote = () => {
      setFadeOut(true);
      setTimeout(() => {
        setFadeOut(false);
        setCurrentQuoteIndex(Math.floor(Math.random() * quotes.length));
      }, 500); // Set a timeout to wait for the fadeOut animation to finish (adjust the time as needed)
    };

    // Change the quote every 10 seconds
    const quoteInterval = setInterval(changeQuote, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className={`motivational-quote ${fadeOut ? "fade-out" : ""}`}>
      <h1>{currentQuote}</h1>
    </div>
  );
};

export default MotivationalQuote;
