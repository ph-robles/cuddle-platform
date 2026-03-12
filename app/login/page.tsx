'use client'
 
import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
 
export default function LoginPage(){
 
  const router = useRouter()
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
 
  async function handleLogin(e:any){
 
    e.preventDefault()
 
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
 
    if(error){
      alert(error.message)
    }else{
      router.push("/")
    }
 
  }
 
  return(
 
    <main className="max-w-md mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>
 
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
 
        <input
        type="email"
        placeholder="Email"
        className="border p-3"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
 
        <input
        type="password"
        placeholder="Password"
        className="border p-3"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
 
        <button className="bg-black text-white p-3 rounded">
          Login
        </button>
 
      </form>
 
    </main>
 
  )
 
}