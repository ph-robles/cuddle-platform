'use client'
 
import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
 
export default function Login(){
 
  const router = useRouter()
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
 
  async function handleLogin(e:any){
 
    e.preventDefault()
 
    setLoading(true)
 
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
 
    if(error){
 
      alert(error.message)
      setLoading(false)
      return
 
    }
 
    router.push("/dashboard")
    router.refresh()
 
  }
 
  return(
 
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
 
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
 
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>
 
        <form onSubmit={handleLogin} className="space-y-4">
 
          <input
            type="email"
            placeholder="Email"
            className="border p-3 w-full rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
 
          <input
            type="password"
            placeholder="Password"
            className="border p-3 w-full rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
 
          <motion.button
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
 
        </form>
 
      </div>
 
    </main>
 
  )
 
}
 