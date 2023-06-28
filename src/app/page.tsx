'use client'
import React,{ useState , useEffect } from "react"
import Love from "@/icons/Love"
import Image from "next/image"
import BlurImage from "@/component/BlurImage"
import Power from "@/icons/Power"
import { useRouter } from "next/navigation"
import { deleteCookie } from 'cookies-next'
const key="scOkSn6HGXiDoPMjnDSqy1JVB6A0vGZdurfST9Xk5ktq9VbMSHBdYJVo"
export default function Home() {
 
  const[dropdown,setDropdown]=useState(false)
  const [queryvalue,setQueryvalue]=useState("")
  const [input,setInput]=useState("")
  const [categories,setCategories]=useState('All')
  
  const allCategories=['All','Animal','Space','Nature']
const router=useRouter()

  const [gallery,setGallery]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [loading,setLoading]=useState(false)

  const getCuratedPhotos = async (query:any) => {
    setLoading(true);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query =="" ?"all":query}&page=${currentPage}&per_page=12`,
      {
        headers: {
          Authorization:key,
        },
      });
    const responseJson = await res.json();
    setLoading(false);
    console.log(responseJson);
    
      setGallery((prev:any) => [...prev, ...responseJson.photos]);
  };
  const handelInfiniteScroll=()=>{
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=document.documentElement.scrollHeight)
    {
    
      setCurrentPage((prev) => prev + 1);
    }
  }
  const handleSearch=()=>{
      if(input.trim() != ""){
        setGallery([])
        getCuratedPhotos(input)
        setQueryvalue("")
      }
  }
  const handleCategory=(cat:any)=>{
    setGallery([])
    getCuratedPhotos(cat)
  }

  useEffect(()=>{
    getCuratedPhotos(input)
  },[currentPage])

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
   <>   
   
    <div className="flex justify-around mt-5 ">
      <div className=" relative flex flex-col">
      <button onClick={()=>{setDropdown(!dropdown)}}  id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{categories} <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
        <div id="dropdown" className={`z-10 ${!dropdown ? 'hidden' : null} absolute top-12  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
          {
            allCategories.map((cat,i)=>{
                 return (
        <li key={i} onClick={()=>{
           setCategories(cat)
           setInput(cat)
           setDropdown(false)
           handleCategory(cat)
        }}>
              <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{cat}</button>
          </li>
                 )
            })
      
          }
            </ul>
        </div>
      </div>
       
        <div className="relative w-9/12">
            <input  onChange={(e)=>{
              setQueryvalue(e.target.value)
              setInput(e.target.value)
              }}  value={queryvalue}  type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search..." />
            <button onClick={handleSearch} type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg  className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
        </div>

        <button onClick={()=>{
            router.push('/login')
            deleteCookie('logged');

        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-10 h-10 flex justify-center items-center overflow-hidden rounded-full">
  <Power/>
</button>  
    </div>

    <div className="p-10 w-full grid grid-cols-12 sm:gap-x-5 gap-x-0 gap-y-5 ">
        {gallery && gallery.map((image, index) => (
            <div key={index} className="lg:col-span-3 sm:col-span-6 col-span-12  overflow-hidden rounded-lg shadow-lg flex flex-col">
            {/* <Image width={500} height={300}  className="object-cover object-center cursor-pointer w-full h-40" src={image.src.original} alt="image" /> */}
            <BlurImage src={image.src.original}/>
            <div className="flex justify-between w-full p-4">
               <p className='text-sm'>PHOTOGRAPHER: {image.photographer} </p>
               <div className="cursor-pointer"><Love /></div>
            </div>
      </div>
  
        ))}
    
    </div>
    {
      loading && <p className="text-lg text-center p-5">Loading...</p>
    }
   </>
  )
}
