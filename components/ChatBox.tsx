"use client"
 
import { useState,useEffect } from "react"
import { supabase } from "@/lib/supabase"
 
export default function ChatBox(){
 
 const [messages,setMessages]=useState<any[]>([])
 const [text,setText]=useState("")
 
 async function send(){
 
  await supabase
   .from("messages")
   .insert({text})
 
  setText("")
 
 }
 
 useEffect(()=>{
 
  const channel = supabase
   .channel("messages")
   .on(
    "postgres_changes",
    {event:"INSERT",schema:"public",table:"messages"},
    payload=>{
     setMessages(m=>[...m,payload.new])
    }
   )
   .subscribe()
 
  return()=>supabase.removeChannel(channel)
 
 },[])
 
 return(
 
  <div>
 
   <div className="space-y-2 mb-4">
 
    {messages.map((m:any)=>(
     <p key={m.id}>{m.text}</p>
    ))}
 
   </div>
 
   <input
    value={text}
    onChange={(e)=>setText(e.target.value)}
    className="border p-2"
   />
 
   <button onClick={send}>
    Send
   </button>
 
  </div>
 
 )
 
}
 