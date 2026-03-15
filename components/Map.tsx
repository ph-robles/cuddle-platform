"use client"
 
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
 
type Cuddler = {
 id:string
 name:string
 lat:number
 lng:number
}
 
type Props = {
 cuddlers:Cuddler[]
}
 
// corrige ícone padrão do Leaflet no Next
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
 iconRetinaUrl:
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
 iconUrl:
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
 shadowUrl:
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})
 
function UserLocation(){
 
 const map = useMap()
 
 useEffect(()=>{
 
 navigator.geolocation.getCurrentPosition((pos)=>{
 
 const { latitude, longitude } = pos.coords
 
 map.setView([latitude,longitude],13)
 
 })
 
 },[map])
 
 return null
 
}
 
export default function Map({cuddlers}:Props){
 
 const [position,setPosition] = useState<[number,number]>([-23.55,-46.63])
 
 useEffect(()=>{
 
 navigator.geolocation.getCurrentPosition((pos)=>{
 
 setPosition([
  pos.coords.latitude,
  pos.coords.longitude
 ])
 
 })
 
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
 
 <UserLocation/>
 
 {cuddlers.map((c)=>(
  <Marker
   key={c.id}
   position={[c.lat,c.lng]}
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
 