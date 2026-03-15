"use client"
 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
 
type Cuddler = {
 id:string
 name:string
 lat:number | null
 lng:number | null
}
 
type Props = {
 cuddlers:Cuddler[]
}
 
delete (L.Icon.Default.prototype as any)._getIconUrl
 
L.Icon.Default.mergeOptions({
 iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
 iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
 shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})
 
export default function Map({cuddlers}:Props){
 
 const [position,setPosition] = useState<[number,number]>([-23.55,-46.63])
 
 useEffect(()=>{
 
 if(!navigator.geolocation) return
 
 navigator.geolocation.getCurrentPosition(
  (pos)=>{
   setPosition([
    pos.coords.latitude,
    pos.coords.longitude
   ])
  },
  ()=>{
   console.log("location not allowed")
  }
 )
 
 },[])
 
 return(
 
 <MapContainer
  center={position}
  zoom={13}
  style={{height:"600px",width:"100%"}}
 >
 
 <TileLayer
  attribution='© OpenStreetMap'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
 />
 
 {cuddlers
 .filter(c=>c.lat && c.lng)
 .map((c)=>(
  <Marker
   key={c.id}
   position={[c.lat!,c.lng!]}
  >
   <Popup>
 
   <div>
 
   <strong>{c.name}</strong>
 
   <br/>
 
   <a href={`/cuddler/${c.id}`}>
   View profile
   </a>
 
   </div>
 
   </Popup>
 
  </Marker>
 ))}
 
 </MapContainer>
 
 )
 
}
 