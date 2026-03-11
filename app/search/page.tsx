import { supabase } from "../../lib/supabase"
import CuddlerCard from "../../components/CuddlerCard"
 
export default async function SearchPage({ searchParams }: any) {
 
  const city = searchParams.city || ""
 
  const { data: cuddlers } = await supabase
    .from("cuddlers")
    .select("*")
    .ilike("city", `%${city}%`)
 
  return (
    <main className="max-w-6xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Cuddlers in {city}
      </h1>
 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 
        {cuddlers?.map((cuddler) => (
          <CuddlerCard key={cuddler.id} cuddler={cuddler} />
        ))}
 
      </div>
 
    </main>
  )
}
 