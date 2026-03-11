type Props = {
  cuddler: {
    id: string
    name: string
    city: string
    state: string
    price: number
    photo_url: string
  }
}
 
export default function CuddlerCard({ cuddler }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
 
      <img
        src={cuddler.photo_url || "/placeholder.jpg"}
        alt={cuddler.name}
        className="w-full h-60 object-cover rounded-lg mb-3"
      />
 
      <h2 className="text-xl font-semibold">
        {cuddler.name}
      </h2>
 
      <p className="text-gray-500">
        {cuddler.city} - {cuddler.state}
      </p>
 
      <p className="text-lg font-bold mt-2">
        ${cuddler.price} / hour
      </p>
 
      <a
        href={`/profile/${cuddler.id}`}
        className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
      >
        View Profile
      </a>
 
    </div>
  )
}