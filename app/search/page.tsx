import { supabase } from "../../lib/supabase"
import Link from "next/link"
 
export default async function SearchPage({ searchParams }: any){
 
  const city = searchParams.city
 
  const { data:cuddlers } = await supabase
    .from("cuddlers")
    .select("*")
    .ilike("city", `%${city}%`)
 
  return(
 
    <main className="max-w-6xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-8">
        Cuddlers in {city}
      </h1>
 
      <div className="grid md:grid-cols-3 gap-6">
 
        {cuddlers?.map((c:any)=>(
 
          <Link key={c.id} href={`/profile/${c.id}`}>
 
            <div className="bg-white p-4 rounded-xl shadow">
 
              <img
                src={c.photo_url || "/placeholder.jpg"}
                className="w-full h-48 object-cover rounded mb-4"
              />
 
              <h2 className="font-bold text-lg">
                {c.name}
              </h2>
 
              <p className="text-gray-500">
                {c.city}
              </p>
 
              <p className="text-blue-600 font-bold">
                ${c.price}/hour
              </p>
 
            </div>
 
          </Link>
 
        ))}
 
      </div>
 
    </main>
 
  )
 
}
 