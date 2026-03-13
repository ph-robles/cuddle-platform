'use client'
 
import { useState } from "react"
import { supabase } from "../lib/supabase"
 
export default function MessageForm({ receiver_id }: any){
 
  const [text,setText] = useState("")
 
  async function sendMessage(e:any){
 
    e.preventDefault()
 
    const { data:userData } = await supabase.auth.getUser()
 
    const user = userData.user
 
    if(!user){
      alert("Login first")
      return
    }
 
    const { error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id:user.id,
          receiver_id,
          text
        }
      ])
 
    if(error){
      alert("Error sending message")
    }else{
      alert("Message sent")
      setText("")
    }
 
  }
 
  return(
 
    <form onSubmit={sendMessage} className="flex flex-col gap-3 mt-6">
 
      <textarea
        placeholder="Write your message..."
        className="border p-3"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />
 
      <button className="bg-black text-white p-3 rounded">
        Send Message
      </button>
 
    </form>
 
  )
 
}
 