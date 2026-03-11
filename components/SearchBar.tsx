'use client'
 
import { useRouter } from "next/navigation"
import { useState } from "react"
 
export default function SearchBar() {
 
  const [city, setCity] = useState("")
  const router = useRouter()
 
  function handleSearch() {
    router.push(`/search?city=${city}`)
  }
 
  return (
    <div className="flex gap-2 mb-10">
 
      <input
        type="text"
        placeholder="Search by city..."
        className="border p-3 rounded w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
 
      <button
        onClick={handleSearch}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Search
      </button>
 
    </div>
  )
}