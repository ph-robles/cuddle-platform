"use client"
 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { LatLngExpression } from "leaflet"
 
type User = {
  id: string
  name: string
  lat: number
  lng: number
}
 
type Props = {
  users: User[]
}
 
export default function Map({ users }: Props){
 
  const center: LatLngExpression = [-22.9068, -43.1729]
 
  return (
 
    <div style={{height:"500px",width:"100%"}}>
 
      <MapContainer
        center={center}
        zoom={12}
        style={{height:"100%",width:"100%"}}
      >
 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
 
        {users.map((user)=>{
 
          const position: LatLngExpression = [user.lat,user.lng]
 
          return(
 
            <Marker
              key={user.id}
              position={position}
            >
 
              <Popup>
 
                <div>
                  <strong>{user.name}</strong>
                  <br/>
                  Available for cuddling
                </div>
 
              </Popup>
 
            </Marker>
 
          )
 
        })}
 
      </MapContainer>
 
    </div>
 
  )
 
}

 