'use client'
 
import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
 
export default function RegisterPage(){
 
  const router = useRouter()
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
 
  async function register(e:any){
 
    e.preventDefault()
 
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
 
    if(error){
      alert(error.message)
    }else{
      alert("Account created!")
      router.push("/login")
    }
 
  }
 
  return(
 
    <main className="max-w-md mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Create Account
      </h1>
 
      <form onSubmit={register} className="flex flex-col gap-4">
 
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
          Register
        </button>
 
      </form>
 
    </main>
 
  )
 
}