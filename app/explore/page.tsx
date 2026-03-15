"use client"
 
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { motion } from "framer-motion"
 
const Map = dynamic(
 () => import("@/components/Map"),
 { ssr:false }
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
 .select("*")
 
 if(!error && data){
 
 setCuddlers(data)
 
 }
 
 setLoading(false)
 
 }
 
 load()
 
 },[])
 
 if(loading){
 
 return(
 
 <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
 
 Loading cuddlers...
 
 </div>
 
 )
 
 }
 
 return(
 
 <div className="min-h-screen bg-slate-950 text-white">
 
 {/* HEADER */}
 
 <div className="max-w-7xl mx-auto p-6">
 
 <h1 className="text-3xl font-bold mb-2">
 
 Find Cuddlers Near You
 
 </h1>
 
 <p className="text-gray-400 mb-8">
 
 Browse professional cuddlers available in your area
 
 </p>
 
 </div>
 
 
 <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 p-6">
 
 
 {/* LISTA DE CUDDLERS */}
 
 <div className="space-y-6 overflow-y-auto h-[600px] pr-4">
 
 {cuddlers.map((cuddler)=>{
 
 return(
 
 <motion.div
 key={cuddler.id}
 whileHover={{scale:1.02}}
 className="bg-slate-800 rounded-xl p-4 flex gap-4 shadow-lg"
 >
 
 <Image
 src={cuddler.photo_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"}
 alt="cuddler"
 width={120}
 height={120}
 className="rounded-lg object-cover"
 />
 
 <div className="flex flex-col justify-between">
 
 <div>
 
 <h2 className="text-xl font-semibold">
 
 {cuddler.name}
 
 </h2>
 
 <p className="text-gray-400">
 
 {cuddler.city}, {cuddler.state}
 
 </p>
 
 </div>
 
 <div className="flex items-center gap-4 mt-3">
 
 <span className="text-purple-400 font-bold">
 
 ${cuddler.price}/hour
 
 </span>
 
 <button
 className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
 >
 
 View Profile
 
 </button>
 
 </div>
 
 </div>
 
 </motion.div>
 
 )
 
 })}
 
 </div>
 
 
 {/* MAPA */}
 
 <div className="rounded-xl overflow-hidden">
 
 <Map users={cuddlers}/>
 
 </div>
 
 
 </div>
 
 </div>
 
 )
 
}
 