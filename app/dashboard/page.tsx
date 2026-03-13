'use client'
 
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
 
export default function DashboardPage() {
 
  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
 
  useEffect(() => {
    loadProfile()
  }, [])
 
  async function loadProfile() {
 
    const { data: { user } } = await supabase.auth.getUser()
 
    if (!user) {
      window.location.href = "/login"
      return
    }
 
    setUser(user)
 
    const { data: messagesData } = await supabase
      .from("messages")
      .select("*")
      .eq("receiver_id", user.id)
 
    setMessages(messagesData || [])
  }
 
  return (
    <main className="max-w-3xl mx-auto p-6">
 
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>
 
      {/* MENSAGENS */}
 
      <h2 className="text-2xl font-bold mt-10 mb-4">
        Messages
      </h2>
 
      <div className="space-y-4">
 
        {messages.map((m)=>(
          <div key={m.id} className="border p-4 rounded">
 
            <p>{m.text}</p>
 
          </div>
        ))}
 
      </div>
 
    </main>
  )
}
 