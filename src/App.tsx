import React, { useEffect, useState } from 'react'
import QuoteBox from './components/QuoteBox';

type Quote = {
  content:string;
  author:string
}

const App = () => {
  const[quote,setQuote] = useState<Quote |null>(null)
  const[loading,setLoading]=useState<boolean>(false)

const fetchQuote = async () =>{
   setLoading(true);
   try{
    const res= await fetch("https://api.quotable.io/random");
    const data= await res.json();
    setQuote({content:data.content,author:data.author})
   }catch(error){
    console.error('Failed to fetch quote',error)
   }finally{
    setLoading(false)
   }
}
useEffect(()=>{
  fetchQuote()
},[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading? <p>Loading...</p>:quote && <QuoteBox quote={quote} onNext={fetchQuote}/>}
    </div>
  )
}

export default App