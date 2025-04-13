type Props ={
  quote : {
    content :string;
    author:string;
  };
  onNext:()=>void;
}
const QuoteBox:React.FC<Props>=({quote,onNext})=>{

  return (
   <div className="bg-white shadow-lg p-6 rounded-md text-center max-w-lg">
    <p className="text-xl font-semibold">"{quote.content}"</p>
    <p className="text-xl font-semibold">{quote.author}</p>
    <button
      onClick={onNext}
      className="mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    </button>
   </div>



  )
}
export default QuoteBox;
