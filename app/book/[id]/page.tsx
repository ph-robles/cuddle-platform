'use client'
 
import { useState } from "react"
import { supabase } from "../../../lib/supabase"
import { useParams } from "next/navigation"
 
export default function BookPage(){
 
  const params = useParams()
 
  const cuddlerId = params.id
 
  const [date,setDate] = useState("")
 
  async function book(){
 
    const { data:userData } = await supabase.auth.getUser()
 
    const user = userData?.user
 
    if(!user){
      alert("Login required")
      return
    }
 
    await supabase
      .from("bookings")
      .insert({
        cuddler_id:cuddlerId,
        user_id:user.id,
        date
      })
 
    alert("Booking request sent")
 
  }
 
  return(
 
    <main className="max-w-xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Book Session
      </h1>
 
      <input
        type="date"
        className="border p-3 w-full rounded"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />
 
      <button
        onClick={book}
        className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
      >
        Confirm Booking
      </button>
 
    </main>
 
  )
 
}