"use client"
 
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { useParams } from "next/navigation"
 
type Cuddler = {
id:string
name:string
city:string
state:string
bio:string
price:number
photo_url:string
}
 
export default function CuddlerProfile(){
 
const params = useParams()
const id = params.id as string
 
const [cuddler,setCuddler] = useState<Cuddler | null>(null)
const [loading,setLoading] = useState(true)
 
useEffect(()=>{
 
async function load(){
 
const {data,error} = await supabase
.from("cuddlers")
.select("*")
.eq("id",id)
.single()
 
if(!error && data){
 
setCuddler(data)
 
}
 
setLoading(false)
 
}
 
load()
 
},[id])
 
if(loading){
 
return(
 
<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
 
Loading profile...
 
</div>
 
)
 
}
 
if(!cuddler){
 
return(
 
<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
 
Cuddler not found
 
</div>
 
)
 
}
 
return(
 
<div className="bg-slate-950 text-white min-h-screen">
 
<div className="max-w-6xl mx-auto p-8">
 
 
{/* HEADER */}
 
<div className="grid md:grid-cols-2 gap-10">
 
 
{/* FOTO */}
 
<Image
src={cuddler.photo_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"}
alt="cuddler"
width={500}
height={500}
className="rounded-xl object-cover"
/>
 
 
{/* INFO */}
 
<div>
 
<h1 className="text-4xl font-bold mb-2">
 
{cuddler.name}
 
</h1>
 
<p className="text-gray-400 mb-4">
 
{cuddler.city}, {cuddler.state}
 
</p>
 
<p className="text-2xl text-purple-400 font-bold mb-6">
 
${cuddler.price} / hour
 
</p>
 
 
{/* BOTÕES */}
 
<div className="flex gap-4">
 
<button className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700">
 
Book Session
 
</button>
 
<button className="border border-purple-600 px-6 py-3 rounded-lg">
 
Chat
 
</button>
 
</div>
 
</div>
 
</div>
 
 
{/* BIO */}
 
<div className="mt-12">
 
<h2 className="text-2xl font-semibold mb-4">
 
About Me
 
</h2>
 
<p className="text-gray-300 leading-relaxed">
 
{cuddler.bio || "No bio yet."}
 
</p>
 
</div>
 
 
</div>
 
</div>
 
)
 
}