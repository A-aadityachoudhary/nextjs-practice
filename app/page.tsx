"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
  const [dog , setDog] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

  const fetchDog = async ()=>{
    setLoading(true);
    try {
      const [res] = await Promise.all([fetch("https://random.dog/woof.json"), delay(2000)]) ;
      const data = await res.json();

      if (data.url.endsWith(".mp4") || data.url.endsWith(".webm")) {
        await fetchDog();
        return;
      }

      setDog(data.url)
    } catch (error) {
      console.log("error occuring, ", error);
    }
    setLoading(false);

  }
  useEffect(()=>{
    fetchDog();
  },[])
  return (
    <div className='bg-[#E1D0C1] flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-4xl text-gray-600 font-bold my-8'>Random Dog Generator !</h1>

      {loading && <p className=' text-gray-600 mb-8'> Loading cute dog ...</p> }

      {!loading && dog && (
        <img className='w-80 h-80 object-cover rounded-lg shadow-lg mb-8' src={dog} alt="dog image" />
      )}

      <button className='bg-black text-white rounded-xl px-4 py-2 hover:bg-gray-600 hover:font-bold' onClick={fetchDog}>click for Dog 🐾</button>
    </div>
  )
}

export default page