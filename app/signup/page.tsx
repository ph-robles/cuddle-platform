'use client'
 
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
 
export default function SignupPage() {
 
  const router = useRouter()
 
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState("")
  const [description, setDescription] = useState("")
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
 
    // ✅ VALIDAÇÃO
    if (!name || !city || !price) {
      alert("Please fill all required fields")
      return
    }
 
    const { error } = await supabase
      .from("cuddlers")
      .insert([
        {
          name,
          city,
          price: Number(price),
          photo,
          description
        }
      ])
 
    if (error) {
      alert("Error creating profile")
      console.log(error)
      return
    }
 
    window.location.href="/"
 
    router.push("/")
  }
 
  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1>Create your Cuddler Profile</h1>
 
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
 
        <input
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
 
        <input
          placeholder="City *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
 
        <input
          placeholder="Price per hour *"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
 
        <input
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
 
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
 
        <button type="submit">
          Create Profile
        </button>
 
      </form>
    </main>
  )
}////////////////