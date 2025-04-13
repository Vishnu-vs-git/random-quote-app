import React, { useEffect, useState } from 'react';
import QuoteBox from './components/QuoteBox';
import axios from 'axios';

type Quote = {
  content: string;
  author: string;
};

const App = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/random'
      );
      const data = res.data[0];
      setQuote({
        content: data.q,
        author: data.a,
      });
    } catch (error) {
      console.error('Failed to fetch quote', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 text-center">
        ✨ Random Quote Generator
      </h1>

      <div className="w-full max-w-xl">
        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-white border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          quote && <QuoteBox quote={quote} onNext={fetchQuote} />
        )}
      </div>
    </div>
  );
};

export default App;
