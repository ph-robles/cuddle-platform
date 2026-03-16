"use client"
 
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import "leaflet/dist/leaflet.css"
 
type Cuddler = {
 id: string
 name: string
 lat: number
 lng: number
}
 
export default function MapExplore(){
 
 const router = useRouter()
 
 const [userLocation,setUserLocation] = useState<[number,number] | null>(null)
 const [cuddlers,setCuddlers] = useState<Cuddler[]>([])
 
 useEffect(()=>{
 
 if(typeof window !== "undefined"){
 
 navigator.geolocation.getCurrentPosition((pos)=>{
 
 setUserLocation([
  pos.coords.latitude,
  pos.coords.longitude
 ])
 
 })
 
 }
 
 },[])
 
 useEffect(()=>{
 
 async function loadCuddlers(){
 
 const {data} = await supabase
 .from("cuddlers")
 .select("id,name,lat,lng")
 
 if(data) setCuddlers(data)
 
 }
 
 loadCuddlers()
 
 },[])
 
 if(!userLocation){
 
 return(
  <div className="text-center mt-10">
  Loading map...
  </div>
 )
 
 }
 
 return(
 
 <MapContainer
  center={userLocation}
  zoom={13}
  className="h-[600px] w-full rounded-xl"
 >
 
 <TileLayer
  attribution="&copy; OpenStreetMap contributors"
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
 />
 
 {cuddlers.map(c=>(
  <Marker
   key={c.id}
   position={[c.lat,c.lng]}
  >
 
  <Popup>
 
  <div className="text-center">
 
  <p className="font-bold">{c.name}</p>
 
  <button
   onClick={()=>router.push(`/cuddler/${c.id}`)}
   className="mt-2 bg-purple-600 px-3 py-1 rounded"
  >
  View Profile
  </button>
 
  </div>
 
  </Popup>
 
  </Marker>
 ))}
 
 </MapContainer>
 
 )
 
}
 