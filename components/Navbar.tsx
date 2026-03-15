'use client'
 
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
 
export default function Navbar(){
 
  const router = useRouter()
 
  const [user,setUser] = useState<any>(null)
 
  async function checkUser(){
 
    const { data:{user} } = await supabase.auth.getUser()
 
    setUser(user)
 
  }
 
  useEffect(()=>{
 
    checkUser()
 
    const { data:listener } = supabase.auth.onAuthStateChange(()=>{
      checkUser()
      router.refresh()
    })
 
    return ()=> listener.subscription.unsubscribe()
 
  },[])
 
  async function logout(){
 
    await supabase.auth.signOut()
 
    router.refresh()
 
  }
 
  return(
 
    <nav className="flex justify-between items-center p-4 border-b">
 
      <Link href="/" className="font-bold text-xl">
        Cuddle Platform
      </Link>
 
      <div className="flex gap-4">
 
        {!user && (
          <>
            <Link href="/login">
              Login
            </Link>
 
            <Link href="/register">
              Signup
            </Link>
          </>
        )}
 
        {user && (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>
 
            <button
              onClick={logout}
              className="text-red-500"
            >
              Logout
            </button>
          </>
        )}
 
      </div>
 
    </nav>
  )
}
 