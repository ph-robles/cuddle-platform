import Link from "next/link"
 
export default function Dashboard(){
 
 return(
 
  <main className="max-w-4xl mx-auto p-10">
 
   <h1 className="text-3xl font-bold mb-6">
    Dashboard
   </h1>
 
   <div className="grid gap-4">
 
    <Link href="/search" className="p-4 border rounded">
     Find Cuddlers
    </Link>
 
    <Link href="/map" className="p-4 border rounded">
     View Map
    </Link>
 
    <Link href="/chat" className="p-4 border rounded">
     Messages
    </Link>
 
   </div>
 
  </main>
 
 )
 
}
 