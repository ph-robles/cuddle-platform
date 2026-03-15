"use client"
 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
 
type User = {
  id: string
  name: string
  lat: number
  lng: number
}
 
export default function Map({ users }:{users:User[]}){
 
  return (
 
    <div style={{height:"500px",width:"100%"}}>
 
      <MapContainer
        center={[-22.9068,-43.1729]}
        zoom={12}
        style={{height:"100%",width:"100%"}}
      >
 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
 
        {users.map((user)=>(
          <Marker
            key={user.id}
            position={[user.lat,user.lng]}
          >
            <Popup>
              {user.name}
            </Popup>
          </Marker>
        ))}
 
      </MapContainer>
 
    </div>
 
  )
 
}
 