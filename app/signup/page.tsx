'use client'
 
import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
 
export default function SignupPage(){
 
  const router = useRouter()
 
  const [name,setName] = useState("")
  const [city,setCity] = useState("")
  const [state,setState] = useState("")
  const [bio,setBio] = useState("")
  const [price,setPrice] = useState("")
 
  async function handleSubmit(e:any){
 
    e.preventDefault()
 
    // validação simples
    if(!name || !city || !price){
      alert("Please fill all required fields")
      return
    }
 
    // pegar usuário logado
    const { data:userData, error:userError } = await supabase.auth.getUser()
 
    if(userError || !userData.user){
      alert("You must be logged in")
      router.push("/login")
      return
    }
 
    const user_id = userData.user.id
 
    // inserir no banco
    const { error } = await supabase
      .from("cuddlers")
      .insert([
        {
          name,
          city,
          state,
          bio,
          price,
          user_id
        }
      ])
 
    if(error){
      alert("Error creating profile")
      console.log(error)
    }else{
      alert("Profile created!")
      router.push("/")
    }
 
  }
 
  return(
 
    <main className="max-w-xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Create your Cuddler Profile
      </h1>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 
        <input
          placeholder="Name"
          className="border p-3"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
 
        <input
          placeholder="City"
          className="border p-3"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
 
        <input
          placeholder="State"
          className="border p-3"
          value={state}
          onChange={(e)=>setState(e.target.value)}
        />
 
        <textarea
          placeholder="Bio"
          className="border p-3"
          value={bio}
          onChange={(e)=>setBio(e.target.value)}
        />
 
        <input
          placeholder="Price per hour"
          type="number"
          className="border p-3"
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
 