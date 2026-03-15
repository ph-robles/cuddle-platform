'use client'
 
import { useState } from "react"
import { useRouter } from "next/navigation"
 
export default function SearchBar(){
 
  const [city,setCity] = useState("")
 
  const router = useRouter()
 
  function search(e:any){
 
    e.preventDefault()
 
    if(!city) return
 
    router.push(`/search?city=${city}`)
 
  }
 
  return(
 
    <form
      onSubmit={search}
      className="bg-white shadow-md p-4 rounded flex gap-4 mt-6"
    >
 
      <input
        placeholder="Search city (Orlando, Miami...)"
        className="border p-3 flex-1 rounded"
        value={city}
        onChange={(e)=>setCity(e.target.value)}
      />
 
      <button className="bg-blue-600 text-white px-6 rounded">
        Search
      </button>
 
    </form>
 
  )
 
}
 