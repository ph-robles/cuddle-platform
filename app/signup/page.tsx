'use client'
 
import { useState } from "react"
import { supabase } from "../../lib/supabase"
 
export default function SignupPage() {
 
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [bio, setBio] = useState("")
  const [price, setPrice] = useState("")
 
  async function handleSubmit(e:any) {
 
    e.preventDefault()
 
    const { error } = await supabase
      .from("cuddlers")
      .insert([
        {
          name,
          city,
          state,
          bio,
          price
        }
      ])
 
    if (error) {
      alert("Error creating profile")
    } else {
      alert("Profile created!")
    }
 
  }
 
  return (
    <main className="max-w-xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Create Your Cuddler Profile
      </h1>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 
        <input
          placeholder="Name"
          className="border p-3 rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
 
        <input
          placeholder="City"
          className="border p-3 rounded"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
 
        <input
          placeholder="State"
          className="border p-3 rounded"
          value={state}
          onChange={(e)=>setState(e.target.value)}
        />
 
        <textarea
          placeholder="Bio"
          className="border p-3 rounded"
          value={bio}
          onChange={(e)=>setBio(e.target.value)}
        />
 
        <input
          placeholder="Price per hour"
          className="border p-3 rounded"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
 
        <button className="bg-black text-white p-3 rounded">
          Create Profile
        </button>
 
      </form>
 
    </main>
  )
}