'use client'
 
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"
 
export default function Home(){
 
  const router = useRouter()
 
  async function goCuddler(){
 
    const { data } = await supabase.auth.getUser()
 
    if(data?.user){
      router.push("/dashboard")
    }else{
      router.push("/login")
    }
 
  }
 
  function goClient(){
    router.push("/explore")
  }
 
  return(
 
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
 
      <div className="max-w-4xl text-center">
 
        <motion.h1
          initial={{opacity:0,y:-20}}
          animate={{opacity:1,y:0}}
          className="text-5xl font-bold mb-6"
        >
          Welcome to Cuddle Platform
        </motion.h1>
 
        <p className="text-gray-600 mb-10">
          Choose how you want to use the platform
        </p>
 
        <div className="grid md:grid-cols-2 gap-8">
 
          <motion.div
            whileHover={{scale:1.05}}
            className="bg-white p-10 rounded-xl shadow-lg"
          >
 
            <h2 className="text-2xl font-bold mb-4">
              I am a Cuddler
            </h2>
 
            <p className="text-gray-500 mb-6">
              Offer your cuddling services
            </p>
 
            <button
              onClick={goCuddler}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700"
            >
              Continue
            </button>
 
          </motion.div>
 
          <motion.div
            whileHover={{scale:1.05}}
            className="bg-white p-10 rounded-xl shadow-lg"
          >
 
            <h2 className="text-2xl font-bold mb-4">
              I'm Looking for a Cuddler
            </h2>
 
            <p className="text-gray-500 mb-6">
              Find cuddling services near you
            </p>
 
            <button
              onClick={goClient}
              className="bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700"
            >
              Find Cuddlers
            </button>
 
          </motion.div>
 
        </div>
 
      </div>
 
    </main>
 
  )
 
}
 