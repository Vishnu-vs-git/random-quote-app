import React, { useEffect, useState } from 'react'
import QuoteBox from './components/QuoteBox';
import axios from 'axios';

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
    const res = await axios.get('https://thingproxy.freeboard.io/fetch/https://zenquotes.io/api/random');
       const data=res.data[0]
      setQuote({
        content: data.q,
        author: data.a,
      });
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