import { supabase } from "../../lib/supabase"
 
export default async function Dashboard(){
 
  const { data:userData } = await supabase.auth.getUser()
 
  const user = userData?.user
 
  const { data:cuddler } = await supabase
    .from("cuddlers")
    .select("*")
    .eq("user_id", user?.id)
    .single()
 
  return(
 
    <main className="max-w-4xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>
 
      {cuddler ? (
 
        <div className="bg-white p-6 rounded shadow">
 
          <h2 className="text-xl font-bold mb-2">
            {cuddler.name}
          </h2>
 
          <p>{cuddler.city}</p>
 
          <p className="text-blue-600 font-bold">
            ${cuddler.price}/hour
          </p>
 
        </div>
 
      ) : (
 
        <p>You haven't created a cuddler profile yet.</p>
 
      )}
 
    </main>
 
  )
 
}
 