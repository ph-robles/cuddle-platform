import { supabase } from "../../../lib/supabase"
 
export default async function ProfilePage({ params }: any) {
 
  const { data: cuddler } = await supabase
    .from("cuddlers")
    .select("*")
    .eq("id", params.id)
    .single()
 
  if (!cuddler) {
    return <p className="p-10">Cuddler not found</p>
  }
 
  return (
    <main className="max-w-4xl mx-auto p-10">
 
      <img
        src={cuddler.photo_url || "/placeholder.jpg"}
        alt={cuddler.name}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />
 
      <h1 className="text-4xl font-bold mb-2">
        {cuddler.name}
      </h1>
 
      <p className="text-gray-500 mb-4">
        {cuddler.city} - {cuddler.state}
      </p>
 
      <p className="text-lg mb-6">
        {cuddler.bio}
      </p>
 
      <p className="text-2xl font-bold mb-6">
        ${cuddler.price} / hour
      </p>
 
      <button className="bg-black text-white px-6 py-3 rounded">
        Book Session
      </button>
 
    </main>
  )
}