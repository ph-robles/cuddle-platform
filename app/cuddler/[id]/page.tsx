"use client"
 
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { useParams } from "next/navigation"
import AuthModal from "@/components/AuthModal"
 
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
const [showAuth,setShowAuth] = useState(false)
const [user,setUser] = useState<any>(null)
 
useEffect(()=>{
 
async function checkUser(){
 
const {data} = await supabase.auth.getUser()
 
setUser(data.user)
 
}
 
checkUser()
 
},[])
 
useEffect(()=>{
 
async function load(){
 
const {data} = await supabase
.from("cuddlers")
.select("*")
.eq("id",id)
.single()
 
setCuddler(data)
setLoading(false)
 
}
 
load()
 
},[id])
 
function handleProtectedAction(){
 
if(!user){
 
setShowAuth(true)
return
 
}
 
alert("Action allowed")
 
}
 
if(loading){
 
return(
 
<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
 
Loading...
 
</div>
 
)
 
}
 
return(
 
<div className="bg-slate-950 text-white min-h-screen">
 
<AuthModal
  open={showAuth}
  onClose={()=>setShowAuth(false)}
/>
 
<div className="max-w-6xl mx-auto p-8">
 
<div className="grid md:grid-cols-2 gap-10">
 
<Image
  src={cuddler?.photo_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"}
  alt="cuddler"
  width={500}
  height={500}
  className="rounded-xl"
/>
 
<div>
 
<h1 className="text-4xl font-bold mb-2">
 
{cuddler?.name}
 
</h1>
 
<p className="text-gray-400 mb-4">
 
{cuddler?.city}, {cuddler?.state}
 
</p>
 
<p className="text-2xl text-purple-400 font-bold mb-6">
 
${cuddler?.price}/hour
 
</p>
 
<div className="flex gap-4">
 
<button
  onClick={handleProtectedAction}
  className="bg-purple-600 px-6 py-3 rounded-lg"
>
 
Book Session
 
</button>
 
<button
  onClick={handleProtectedAction}
  className="border border-purple-600 px-6 py-3 rounded-lg"
>
 
Chat
 
</button>
 
</div>
 
</div>
 
</div>
 
<div className="mt-12">
 
<h2 className="text-2xl font-semibold mb-4">
 
About
 
</h2>
 
<p className="text-gray-300">
 
{cuddler?.bio}
 
</p>
 
</div>
 
</div>
 
</div>
 
)
 
}