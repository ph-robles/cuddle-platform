'use client'
 
import Link from "next/link"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
 
export default function Navbar(){
 
  const router = useRouter()
 
  async function logout(){
 
    await supabase.auth.signOut()
 
    router.push("/")
 
  }
 
  return(
 
    <nav className="border-b p-4">
 
      <div className="max-w-6xl mx-auto flex justify-between items-center">
 
        <Link href="/" className="font-bold text-xl">
          Cuddle Platform
        </Link>
 
        <div className="flex gap-6">
 
          <Link href="/">
            Home
          </Link>
 
          <Link href="/signup">
            Become a Cuddler
          </Link>
 
          <Link href="/dashboard">
            Dashboard
          </Link>
 
          <Link href="/login">
            Login
          </Link>
 
          <button
            onClick={logout}
            className="text-red-500"
          >
            Logout
          </button>
 
        </div>
 
      </div>
 
    </nav>
 
  )
 
}
 