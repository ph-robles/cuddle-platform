"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Message = {
  id: string
  text: string
  sender_id: string
  created_at: string
}

type Props = {
  receiverId: string
}

export default function Chat({ receiverId }: Props) {

  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {

    async function loadUser() {

      const { data } = await supabase.auth.getUser()

      setUser(data.user)

    }

    loadUser()

  }, [])

  async function loadMessages() {

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("receiver_id", receiverId)

    if (data) setMessages(data)

  }

  useEffect(() => {

    loadMessages()

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        payload => {
          setMessages((m) => [...m, payload.new as Message])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }

  }, [])

  async function sendMessage() {

    if (!user) return alert("Login required")

    await supabase
      .from("messages")
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        text
      })

    setText("")

  }

  return (

    <div className="bg-slate-800 p-4 rounded-xl">

      <div className="h-64 overflow-y-auto mb-4">

        {messages.map(m => (
          <div key={m.id} className="mb-2">

            <span className="text-gray-300">

              {m.text}

            </span>

          </div>
        ))}

      </div>

      <div className="flex gap-2">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded bg-slate-700 text-white"
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 px-4 py-2 rounded"
        >

          Send

        </button>

      </div>

    </div>

  )

}
