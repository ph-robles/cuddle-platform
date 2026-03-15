'use client'
 
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { motion } from "framer-motion"
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
 
export default function LoginPage(){
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
 
  async function handleLogin(e:React.FormEvent){
    e.preventDefault()
 
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
 
    if(error){
      alert(error.message)
      return
    }
 
    window.location.href="/dashboard"
  }
 
  return(
 
    <main className="max-w-md mx-auto p-6">
 
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>
 
      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
 
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-3 rounded w-full"
        />
 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-3 rounded w-full"
        />
 
        {/* BOTÃO COM ANIMAÇÃO */}
 
        <motion.button
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
        >
          Login
        </motion.button>
 
      </form>
 
    </main>
  )
}
 