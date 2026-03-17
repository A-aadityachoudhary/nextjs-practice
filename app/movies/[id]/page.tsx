import React from 'react'
import Link from 'next/link';


type Props = {
  params: {
    id: string;
  };
};

const page =async ({params}:Props) => {
    const {id} = await params;

    const res = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${id}`,{ cache: 'no-store' })
    const data = await res.json();
    const movie = data.description?.[0];
    if (!movie){
        return <div>
            <h1>
                Movie is not Available. Sorry!!
            </h1>
        </div>
    }

  return (
    <div>
        <Link href="/movies">
        <button className='m-4 text-white  px-4 py-2 text-3xl hover:cursor-pointer  '>
            ←
        </button>
        </Link>
        <div className='p-6 flex flex-col items-center'>
                        <img
                          src={movie['#IMG_POSTER']}
                          alt={movie['#TITLE']}
                          className="w-80 rounded-lg mb-4"
                        />

                        <h3 className='text-3xl text-gray-600 font-bold mt-4"' >{movie["#TITLE"]}</h3>
                        <p className='text-gray-400 text-lg'> {movie['#YEAR']}</p>

                    </div>
    </div>
  )
}

export default page