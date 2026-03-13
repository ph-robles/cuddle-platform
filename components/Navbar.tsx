'use client'
 
import Link from "next/link"
import { supabase } from "../lib/supabase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
 
export default function Navbar(){
 
  const [user,setUser] = useState<any>(null)
 
  const router = useRouter()
 
  useEffect(()=>{
 
    checkUser()
 
  },[])
 
  async function checkUser(){
 
    const { data } = await supabase.auth.getUser()
 
    setUser(data.user)
 
  }
 
  async function logout(){
 
    await supabase.auth.signOut()
 
    router.push("/")
 
    router.refresh()
 
  }
 
  return(
 
    <nav className="bg-white shadow">
 
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
 
        <Link href="/" className="text-xl font-bold text-primary">
          Cuddle Platform
        </Link>
 
        <div className="flex gap-6 items-center">
 
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
 
          {user && (
            <>
              <Link href="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
 
              <button
                onClick={logout}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
 
          {!user && (
            <>
              <Link href="/login" className="hover:text-primary">
                Login
              </Link>
 
              <Link
                href="/register"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
 
        </div>
 
      </div>
 
    </nav>
 
  )
 
}