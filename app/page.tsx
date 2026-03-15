'use client'
 
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"
import { useState } from "react"
 
export default function Home(){
 
  const router = useRouter()
 
  const [loading,setLoading] = useState(false)
 
  async function handleCuddler(){
 
    setLoading(true)
 
    const { data } = await supabase.auth.getUser()
 
    const user = data?.user
 
    if(!user){
      router.push("/login")
      return
    }
 
    router.push("/dashboard")
 
  }
 
  function handleClient(){
 
    router.push("/explore")
 
  }
 
  return(
 
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
 
      <div className="max-w-4xl text-center px-6">
 
        <motion.h1
          initial={{opacity:0,y:-20}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.6}}
          className="text-5xl font-bold mb-6"
        >
          Welcome to Cuddle Platform
        </motion.h1>
 
        <p className="text-gray-600 mb-12 text-lg">
          Choose how you want to use the platform
        </p>
 
        <div className="grid md:grid-cols-2 gap-10">
 
          {/* CUDDLER */}
 
          <motion.div
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            className="bg-white p-10 rounded-xl shadow-lg"
          >
 
            <h2 className="text-2xl font-bold mb-4">
              I am a Cuddler
            </h2>
 
            <p className="text-gray-500 mb-6">
              Offer your cuddling services
            </p>
 
            <button
              onClick={handleCuddler}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
            >
              {loading ? "Checking login..." : "Continue as Cuddler"}
            </button>
 
          </motion.div>
 
          {/* CLIENT */}
 
          <motion.div
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            className="bg-white p-10 rounded-xl shadow-lg"
          >
 
            <h2 className="text-2xl font-bold mb-4">
              I'm Looking for a Cuddler
            </h2>
 
            <p className="text-gray-500 mb-6">
              Find cuddling services near you
            </p>
 
            <button
              onClick={handleClient}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
            >
              Find Cuddlers
            </button>
 
          </motion.div>
 
        </div>
 
      </div>
 
    </main>
 
  )
 
}
 