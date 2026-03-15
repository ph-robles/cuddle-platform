"use client"
 
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { supabase } from "@/lib/supabase"
 
const Map = dynamic(
  () => import("@/components/Map"),
  { ssr:false }
)
 
type User = {
  id: string
  name: string
  lat: number
  lng: number
}
 
export default function ExplorePage(){
 
  const [users,setUsers] = useState<User[]>([])
  const [loading,setLoading] = useState(true)
 
  useEffect(()=>{
 
    async function loadUsers(){
 
      const { data,error } = await supabase
        .from("profiles")
        .select("id,name,lat,lng")
        .not("lat","is",null)
 
      if(!error && data){
 
        setUsers(data)
 
      }
 
      setLoading(false)
 
    }
 
    loadUsers()
 
  },[])
 
  if(loading){
 
    return(
 
      <main className="min-h-screen flex items-center justify-center">
 
        <p>Loading map...</p>
 
      </main>
 
    )
 
  }
 
  return(
 
    <main className="min-h-screen">
 
      <div className="max-w-6xl mx-auto p-6">
 
        <h1 className="text-3xl font-bold mb-6">
          Find Cuddlers Near You
        </h1>
 
        <Map users={users}/>
 
      </div>
 
    </main>
 
  )
 
}
 