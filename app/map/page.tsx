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
 
export default function MapPage(){
 
  const [users,setUsers] = useState<User[]>([])
 
  useEffect(()=>{
 
    async function loadCuddlers(){
 
      const { data,error } = await supabase
        .from("cuddlers")
        .select("id,name,lat,lng")
        .not("lat","is",null)
 
      if(!error && data){
        setUsers(data)
      }
 
    }
 
    loadCuddlers()
 
  },[])
 
  return(
 
    <main className="p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Cuddlers Near You
      </h1>
 
      <Map users={users}/>
 
    </main>
 
  )
 
}
 