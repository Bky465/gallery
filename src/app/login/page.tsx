'use client'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
const page = () => {
    const [users,setUsers]=useState()
    const [mail,setMail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")

    const router=useRouter()

    const handleLogin=()=>{
        const data={
            mail,
            password
        }
        if(users){
            const result=users.filter(elem=>{
                return elem.mail == data.mail
         })
         if(result.length>0){
             if(result[0].password == data.password){
                setError("")
                setCookie('logged', true);
                router.push('/')
             }
             else{
                setError("password is invallid")
             }
         }     
         else{
            setError("User is not exist")
         }  
          
        }
        else{
            setError("User is not exist")
          
        }
   
    }
    useEffect(()=>{
      
           const locdata=JSON.parse(localStorage.getItem("User"))
           setUsers(locdata)
    },[])

  return (
 <>
    <section className="bg-gray-50 dark:bg-gray-900 relative">
        <p className='text-red-500 text-lg absolute right-60 top-10 '>{error}</p>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Login 
              </h1>
              <form onSubmit={(e)=>{
                e.preventDefault()
                handleLogin()
              }}  className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input onChange={(e)=>setMail(e.target.value)} value={mail} required type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={(e)=>setPassword(e.target.value)} value={password} required type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>       
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't Have Any Account? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
 </>
  )
}

export default page
