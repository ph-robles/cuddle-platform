"use client"
 
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
 
export default function Map({cuddlers}:any){
 
 return(
 
  <MapContainer
   center={[-22.9,-43.2]}
   zoom={12}
   style={{height:"500px"}}
  >
 
   <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
 
   {cuddlers.map((c:any)=>(
    <Marker key={c.id} position={[c.lat,c.lng]}>
 
     <Popup>
 
      <b>{c.name}</b>
      <br/>
      ${c.price}/hour
 
     </Popup>
 
    </Marker>
   ))}
 
  </MapContainer>
 
 )
 
}

 