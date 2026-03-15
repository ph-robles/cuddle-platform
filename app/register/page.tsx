'use client'
 
import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
 
export default function Register(){
 
  const router = useRouter()
 
  const [name,setName] = useState("")
  const [city,setCity] = useState("")
  const [state,setState] = useState("")
  const [bio,setBio] = useState("")
  const [price,setPrice] = useState("")
  const [photo,setPhoto] = useState<File | null>(null)
 
  async function handleSubmit(e:any){
 
    e.preventDefault()
 
    const { data:userData } = await supabase.auth.getUser()
 
    const user = userData?.user
 
    if(!user){
      alert("You must be logged in")
      return
    }
 
    let photoUrl = ""
 
    if(photo){
 
      const fileName = `${Date.now()}-${photo.name}`
 
      const { error:uploadError } = await supabase
        .storage
        .from("cuddler-photos")
        .upload(fileName, photo)
 
      if(uploadError){
        alert("Upload failed")
        return
      }
 
      const { data } = supabase
        .storage
        .from("cuddler-photos")
        .getPublicUrl(fileName)
 
      photoUrl = data.publicUrl
 
    }
 
    const { error } = await supabase
      .from("cuddlers")
      .insert({
        name,
        city,
        state,
        bio,
        price,
        photo_url:photoUrl,
        user_id:user.id
      })
 
    if(error){
      alert("Error creating profile")
      return
    }
 
    router.push("/dashboard")
 
  }
 
  return(
 
    <main className="max-w-xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Create Cuddler Profile
      </h1>
 
      <form onSubmit={handleSubmit} className="space-y-4">
 
        <input
          placeholder="Name"
          className="border p-3 w-full rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
 
        <input
          placeholder="City"
          className="border p-3 w-full rounded"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
 
        <input
          placeholder="State"
          className="border p-3 w-full rounded"
          value={state}
          onChange={(e)=>setState(e.target.value)}
        />
 
        <textarea
          placeholder="Bio"
          className="border p-3 w-full rounded"
          value={bio}
          onChange={(e)=>setBio(e.target.value)}
        />
 
        <input
          placeholder="Price per hour"
          className="border p-3 w-full rounded"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
 
        <input
          type="file"
          onChange={(e)=>setPhoto(e.target.files?.[0] || null)}
        />
 
        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Create Profile
        </button>
 
      </form>
 
    </main>
 
  )
 
}
 