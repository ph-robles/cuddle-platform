"use client"
 
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import dynamic from "next/dynamic"
import Image from "next/image"
 
const Map = dynamic(
 ()=>import("@/components/Map"),
 {ssr:false}
)
 
type Cuddler = {
 id:string
 name:string
 city:string
 state:string
 price:number
 photo_url:string
 lat:number
 lng:number
}
 
export default function ExplorePage(){
 
 const [cuddlers,setCuddlers] = useState<Cuddler[]>([])
 const [loading,setLoading] = useState(true)
 
 useEffect(()=>{
 
 async function load(){
 
 const {data,error} = await supabase
 .from("cuddlers")
 .select("id,name,city,state,price,photo_url,lat,lng")
 
 if(!error && data){
 
 setCuddlers(data)
 
 }
 
 setLoading(false)
 
 }
 
 load()
 
 },[])
 
 if(loading){
 
 return(
 
 <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
 
 Loading...
 
 </div>
 
 )
 
 }
 
 return(
 
 <div className="bg-slate-950 text-white min-h-screen">
 
 <div className="max-w-7xl mx-auto p-8">
 
 <h1 className="text-3xl font-bold mb-6">
 
 Find Cuddlers Near You
 
 </h1>
 
 <div className="grid md:grid-cols-2 gap-8">
 
 {/* LISTA */}
 
 <div className="space-y-6">
 
 {cuddlers.map((c)=>(
  <div
   key={c.id}
   className="bg-slate-800 p-4 rounded-xl flex gap-4"
  >
 
  <Image
   src={c.photo_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"}
   alt="cuddler"
   width={120}
   height={120}
   className="rounded-lg object-cover"
  />
 
  <div>
 
  <h2 className="text-xl font-semibold">
 
  {c.name}
 
  </h2>
 
  <p className="text-gray-400">
 
  {c.city}, {c.state}
 
  </p>
 
  <p className="text-purple-400 font-bold">
 
  ${c.price}/hour
 
  </p>
 
  <a
   href={`/cuddler/${c.id}`}
   className="text-sm text-purple-400"
  >
  View profile
  </a>
 
  </div>
 
  </div>
 ))}
 
 </div>
 
 {/* MAPA */}
 
 <Map cuddlers={cuddlers}/>
 
 </div>
 
 </div>
 
 </div>
 
 )
 
}
 