import { supabase } from "../lib/supabase"
import Link from "next/link"
 
export default async function Home(){
 
  const { data:cuddlers } = await supabase
    .from("cuddlers")
    .select("*")
 
  return(
 
    <main>
 
      {/* HERO */}
 
      <section className="bg-white py-20">
 
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
 
          <div>
 
            <h1 className="text-5xl font-bold mb-6">
              Find Professional
              <span className="text-primary"> Cuddlers </span>
              Near You
            </h1>
 
            <p className="text-gray-600 mb-6">
              Safe, professional and verified cuddling services.
              Book a session and relax with trusted cuddlers.
            </p>
 
            <Link
              href="#cuddlers"
              className="bg-primary text-white px-6 py-3 rounded text-lg"
            >
              Find a Cuddler
            </Link>
 
          </div>
 
          <div>
 
            <img
              src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999"
              className="rounded-xl shadow-lg"
            />
 
          </div>
 
        </div>
 
      </section>
 
      {/* LISTA DE CUDDLERS */}
 
      <section id="cuddlers" className="max-w-6xl mx-auto p-10">
 
        <h2 className="text-3xl font-bold mb-8">
          Available Cuddlers
        </h2>
 
        <div className="grid md:grid-cols-3 gap-6">
 
          {cuddlers?.map((c:any)=>(
 
            <Link
              key={c.id}
              href={`/profile/${c.id}`}
            >
 
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
 
                <img
                  src={c.photo_url || "/placeholder.jpg"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
 
                <h3 className="text-xl font-bold">
                  {c.name}
                </h3>
 
                <p className="text-gray-500">
                  {c.city}
                </p>
 
                <p className="text-primary font-bold mt-2">
                  ${c.price}/hour
                </p>
 
              </div>
 
            </Link>
 
          ))}
 
        </div>
 
      </section>
 
    </main>
 
  )
 
}
 