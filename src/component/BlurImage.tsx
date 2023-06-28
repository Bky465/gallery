import React,{useState} from 'react'
import Image from 'next/image'

type TProps = {
    src: string;
  };
  
const BlurImage = ({src}: TProps) => {
   const [loading,setLoading] =useState(true)
  return (
    <div  className=" h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image 
   src={src}
   alt='Image'
   width={500}
   height={300}
   className={` w-full h-full
   object-cover object-center cursor-pointe duration-700 ease-in-out group-hover:opacity-75
   ${
    loading
       ? "scale-110 blur-2xl grayscale"
       : "scale-100 blur-0 grayscale-0"
   })`}
onLoadingComplete={() => setLoading(false)}>

   </Image>
    </div>
  )
}

export default BlurImage
