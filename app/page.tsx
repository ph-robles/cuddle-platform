import { supabase } from "../lib/supabase"
import CuddlerCard from "../components/CuddlerCard"
import SearchBar from "../components/SearchBar"
 
export default async function Home() {
 
  const { data: cuddlers } = await supabase
    .from("cuddlers")
    .select("*")
 
  return (
    <main className="max-w-6xl mx-auto p-10">
 
      <h1 className="text-4xl font-bold mb-6">
        Find Professional Cuddlers
      </h1>
 
      <SearchBar />
 
          <div className="grid md:grid-cols-3 gap-6 mt-10">
    
    {cuddlers?.map((c:any)=>(
    
      <div
      key={c.id}
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
    
        <img
        src={c.photo_url || "/placeholder.jpg"}
        className="w-full h-48 object-cover rounded-lg mb-4"
        />
    
        <h2 className="text-xl font-bold">
          {c.name}
        </h2>
    
        <p className="text-gray-500">
          {c.city}
        </p>
    
        <p className="text-primary font-bold mt-2">
          ${c.price}/hour
        </p>
    
      </div>
    
    ))}
    
      </div>
 
 
    </main>
  )
}