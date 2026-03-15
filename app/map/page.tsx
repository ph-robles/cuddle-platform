import { supabase } from "../../lib/supabase"
import Map from "../../components/Map"
 
export default async function MapPage(){
 
const { data:cuddlers } = await supabase
  .from("cuddlers")
  .select("*")
 
return(
 
  <main className="p-10">
 
   <h1 className="text-3xl font-bold mb-6">
    Cuddlers Near You
   </h1>
 
   <Map cuddlers={cuddlers}/>
 
  </main>
 
)
 
}