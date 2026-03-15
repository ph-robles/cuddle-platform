"use client"
 
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
 
type Message = {
  id: string
  text: string
}
 
export default function ChatBox(){
 
  const [messages,setMessages] = useState<Message[]>([])
  const [text,setText] = useState("")
 
  async function send(){
 
    if(!text) return
 
    await supabase
      .from("messages")
      .insert({ text })
 
    setText("")
 
  }
 
  useEffect(()=>{
 
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event:"INSERT",
          schema:"public",
          table:"messages"
        },
        (payload:any)=>{
 
          setMessages((prev)=>[
            ...prev,
            payload.new
          ])
 
        }
      )
      .subscribe()
 
    return ()=>{
 
      supabase.removeChannel(channel)
 
    }
 
  },[])
 
  return(
 
    <div className="space-y-4">
 
      <div className="border p-4 h-64 overflow-y-auto">
 
        {messages.map((m)=>(
          <p key={m.id}>
            {m.text}
          </p>
        ))}
 
      </div>
 
      <div className="flex gap-2">
 
        <input
          value={text}
          onChange={(e)=>setText(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Type message..."
        />
 
        <button
          onClick={send}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Send
        </button>
 
      </div>
 
    </div>
 
  )
 
}
 