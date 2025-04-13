import React, { useEffect, useState } from 'react';
import QuoteBox from './components/QuoteBox';
import axios from 'axios';
import toast from 'react-hot-toast';

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

        {/* Flex container for buttons */}
        <div className="flex gap-4 mt-6 justify-center">
          {/* Copy Button */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(`"${quote?.content}" - ${quote?.author}`);
              toast.success("Quote copied to clipboard!");
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300"
          >
            Copy 📋
          </button>

          {/* Next Button (If you want to include a Next button, use below button) */}
          <button
            onClick={fetchQuote}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300"
          >
            Next 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
