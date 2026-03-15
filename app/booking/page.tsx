"use client"
 
export default function Booking(){
 
 async function pay(){
 
  const res = await fetch("/api/create-checkout",{
   method:"POST"
  })
 
  const data = await res.json()
 
  window.location.href=data.url
 
 }
 
 return(
 
  <main className="p-10">
 
   <h1 className="text-3xl font-bold mb-6">
    Book Session
   </h1>
 
   <button
    onClick={pay}
    className="bg-green-600 text-white px-6 py-3"
   >
    Pay with Card
   </button>
 
  </main>
 
 )
 
}
 