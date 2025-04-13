import { useState, useEffect } from 'react';

type Props = {
  quote: {
    content: string;
    author: string;
  };
  onNext: () => void;
};

const QuoteBox: React.FC<Props> = ({ quote, onNext }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onNext();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg max-w-lg mx-auto border border-purple-100">
      <div className="relative mb-6">
        <div className="absolute -top-6 -left-2 text-purple-300 text-6xl font-serif">"</div>
        <p className={`text-xl text-gray-800 leading-relaxed font-light italic px-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {quote.content}
        </p>
        <div className="absolute -bottom-8 -right-2 text-purple-300 text-6xl font-serif">"</div>
      </div>
      
      <div className="mt-10 flex flex-col items-end">
        <div className="h-px w-16 bg-gradient-to-r from-blue-300 to-purple-400 mb-2"></div>
        <p className="text-lg text-gray-700 font-medium">{quote.author}</p>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          Next Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;