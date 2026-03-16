"use client"
 
import dynamic from "next/dynamic"
 
const MapExplore = dynamic(
  () => import("@/components/MapExplore"),
  { ssr: false }
)
 
export default function ExplorePage(){
 
 return(
 
 <div className="max-w-6xl mx-auto p-6">
 
 <h1 className="text-3xl font-bold mb-6">
 Explore Cuddlers Near You
 </h1>
 
 <MapExplore/>
 
 </div>
 
 )
 
}
 