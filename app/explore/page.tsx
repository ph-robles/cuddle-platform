"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

type Cuddler = {
  id: string
  name: string
  city: string
  state: string
  price: number
  photo_url: string
}

export default function ExplorePage() {

  const [cuddlers, setCuddlers] = useState<Cuddler[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function load() {

      const { data, error } = await supabase
        .from("cuddlers")
        .select("*")

      if (error) {

        console.error(error)

      }

      if (data) {

        setCuddlers(data)

      }

      setLoading(false)

    }

    load()

  }, [])

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

        Loading...

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-6">

          Find Cuddlers

        </h1>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {cuddlers.map((cuddler) => {

            return (

              <div
                key={cuddler.id}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg"
              >

                <Image
                  src={cuddler.photo_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"}
                  alt="cuddler"
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />

                <div className="p-4">

                  <h2 className="text-xl font-semibold">

                    {cuddler.name}

                  </h2>

                  <p className="text-gray-400">

                    {cuddler.city}, {cuddler.state}

                  </p>

                  <p className="text-purple-400 font-bold mt-2">

                    ${cuddler.price}/hour

                  </p>

                  <button className="mt-4 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700">

                    View Profile

                  </button>

                </div>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}
