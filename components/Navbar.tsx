'use client'
 
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
 
export default function Navbar(){
 
  const router = useRouter()
 
  const [user,setUser] = useState<any>(null)
 
  useEffect(()=>{
 
    checkUser()
 
  },[])
 
  async function checkUser(){
 
    const { data } = await supabase.auth.getUser()
 
    setUser(data.user)
 
  }
 
  async function handleLogout(){
 
    await supabase.auth.signOut()
 
    router.push("/")
 
    router.refresh()
 
  }
 
  return(
 
    <nav className="border-b bg-white">
 
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
 
        <Link href="/" className="font-bold text-xl">
          Cuddle Platform
        </Link>
 
        <div className="flex gap-6 items-center">
 
          <Link href="/">
            Home
          </Link>
 
          {user && (
            <>
              <Link href="/dashboard">
                Dashboard
              </Link>
 
              <button
                onClick={handleLogout}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}
 
          {!user && (
            <>
              <Link href="/login">
                Login
              </Link>
 
              <Link href="/register">
                Register
              </Link>
            </>
          )}
 
        </div>
 
      </div>
 
    </nav>
 
  )
 
}
 