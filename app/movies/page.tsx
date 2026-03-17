"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const page = () => {

    type Movie = {
  '#TITLE': string;
  '#YEAR': number;
  '#IMG_POSTER': string;
  '#IMDB_ID': string;
    };
    const router = useRouter();
    const [query,setQuery] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([])
    const searchMovies = async () : Promise<void> =>{
        if(!query){
            return;
        }
    
    try {
        const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${query}`);
        const data = await res.json();
        setMovies(data.description);
        
    } catch (error) {
        console.log("error in fetching, ", error);
    }
}
useEffect(() => {
  if (query) {
    searchMovies();
  }
}, [query]);

  return (
    <div className='backdrop-blur-lg bg-white/10   shadow-xl transition-all duration-500 p-6  min-h-screen'>
        <h1 className='text-2xl flex items-center justify-center font-bold mb-6"'>Search Movies !</h1>
        <div className='flex items-center justify-center my-4  gap-3 '>
            <input className='border border-black hover:border-2 p-2 w-70 outline-none ' type="text" placeholder='search movies ...' value={query} onChange={(e)=>setQuery(e.target.value)} name="" id="" />
            <button className='px-8 py-2 cursor-pointer bg-black  ' onClick={searchMovies} >Seach</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {
                movies.map((movie,index)=>(
                    <div className='rounded-xl bg-white border p-2 hover:cursor-pointer  transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ' key={movie['#IMDB_ID']}  onClick={() => router.push(`/movies/${movie['#IMDB_ID']}`)}>
                        <img
                          src={movie['#IMG_POSTER']}
                          alt={movie['#TITLE']}
                          className="w-full h-48 object-cover"
                        />

                        <h3 className='text-gray-600 my-2 font-semibold' >{movie["#TITLE"]}</h3>
                        <p className='text-gray-400'> {movie['#YEAR']}</p>

                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default page