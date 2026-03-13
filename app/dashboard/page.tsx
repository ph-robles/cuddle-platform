'use client'
 
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"
 
export default function Dashboard(){
 
  const router = useRouter()
 
  const [profile,setProfile] = useState<any>(null)
 
  const [loading,setLoading] = useState(true)
 
  useEffect(()=>{
 
    loadProfile()
 
  },[])
 
  async function loadProfile(){
 
    const { data:userData } = await supabase.auth.getUser()
 
    const user = userData.user
 
    if(!user){
 
      router.push("/login")
 
      return
 
    }
 
    const { data } = await supabase
      .from("cuddlers")
      .select("*")
      .eq("user_id",user.id)
      .single()
 
    setProfile(data)
 
    setLoading(false)
 
  }
 
  if(loading){
 
    return <div className="p-10">Loading...</div>
 
  }
 
  if(!profile){
 
    return <div className="p-10">Create your cuddler profile first.</div>
 
  }
 
  return(
 
    <main className="max-w-xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Your Dashboard
      </h1>
 
      <p>
        Welcome {profile.name}
      </p>
 
    </main>
 
  )
 
}
 