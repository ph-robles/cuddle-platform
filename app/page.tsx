import { supabase } from "../lib/supabase"
import Link from "next/link"
import SearchBar from "../components/SearchBar"
 
import { FaUserCheck, FaShieldAlt, FaHeart } from "react-icons/fa"
 
export default async function Home(){
 
  const { data:cuddlers } = await supabase
    .from("cuddlers")
    .select("*")
 
  return(
 
    <main>
 
      {/* HERO */}
 
      <section className="bg-white py-24">
 
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
 
          <div>
 
            <h1 className="text-5xl font-bold mb-6">
              Find Professional
              <span className="text-blue-600"> Cuddlers </span>
              Near You
            </h1>
 
            <p className="text-gray-600 mb-6">
              Safe, verified and professional cuddling services.
            </p>
 
            <SearchBar/>
 
          </div>
 
          <img
            src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999"
            className="rounded-xl shadow-lg"
          />
 
        </div>
 
      </section>
 
      {/* FEATURES */}
 
      <section className="bg-gray-50 py-20">
 
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
 
          <div className="bg-white p-8 rounded-xl shadow">
 
            <FaUserCheck className="text-4xl mx-auto text-blue-600 mb-4"/>
 
            <h3 className="text-xl font-bold mb-2">
              Verified Professionals
            </h3>
 
            <p className="text-gray-600">
              All cuddlers go through identity verification.
            </p>
 
          </div>
 
          <div className="bg-white p-8 rounded-xl shadow">
 
            <FaShieldAlt className="text-4xl mx-auto text-blue-600 mb-4"/>
 
            <h3 className="text-xl font-bold mb-2">
              Safe Platform
            </h3>
 
            <p className="text-gray-600">
              Secure messaging and verified reviews.
            </p>
 
          </div>
 
          <div className="bg-white p-8 rounded-xl shadow">
 
            <FaHeart className="text-4xl mx-auto text-blue-600 mb-4"/>
 
            <h3 className="text-xl font-bold mb-2">
              Relax & Connect
            </h3>
 
            <p className="text-gray-600">
              Book a relaxing cuddling session.
            </p>
 
          </div>
 
        </div>
 
      </section>
 
      {/* CUDDLERS */}
 
      <section className="max-w-6xl mx-auto p-10">
 
        <h2 className="text-3xl font-bold mb-8">
          Available Cuddlers
        </h2>
 
        <div className="grid md:grid-cols-3 gap-6">
 
          {cuddlers?.map((c:any)=>(
 
            <Link key={c.id} href={`/profile/${c.id}`}>
 
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
 
                <img
                  src={c.photo_url || "/placeholder.jpg"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
 
                <h3 className="text-xl font-bold flex items-center gap-2">
 
                  {c.name}
 
                  {c.verified && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      ✔ Verified
                    </span>
                  )}
 
                </h3>
 
                <p className="text-gray-500">
                  {c.city}
                </p>
 
                <p className="text-blue-600 font-bold mt-2">
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
 