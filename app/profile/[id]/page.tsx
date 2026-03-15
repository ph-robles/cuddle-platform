import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import ReviewForm from "../../../components/ReviewForm"
import MessageForm from "../../../components/MessageForm"
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
 
export default async function ProfilePage({ params }: { params: { id: string } }) {
 
  const { data: cuddler } = await supabase
    .from('cuddlers')
    .select('*')
    .eq('id', params.id)
    .single()
 
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('cuddler_id', params.id)
    .order('created_at', { ascending: false })
 
  if (!cuddler) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Cuddler não encontrado</h1>
      </main>
    )
  }
 
  return (
    <main className="max-w-3xl mx-auto p-6">
 
      {/* TÍTULO COM SELO VERIFIED */}
 
      <h1 className="text-4xl font-bold flex items-center gap-3">
 
        {cuddler.name}
 
        {cuddler.verified && (
          <span className="bg-green-500 text-white text-sm px-3 py-1 rounded">
            Verified
          </span>
        )}
 
      </h1>
 
      <Image
        src={cuddler.photo}
        alt={cuddler.name}
        width={300}
        height={300}
        style={{ borderRadius: 12, marginTop: 20 }}
      />
 
      <p style={{ marginTop: 20 }}>
        {cuddler.description}
      </p>
 
      <p className="mt-4">
        <strong>Cidade:</strong> {cuddler.city}
      </p>
 
      <p className="text-2xl font-bold mb-6">
        ${cuddler.price} / hour
      </p>
 
      {/* BOTÃO DE MENSAGEM */}
 
      <MessageForm receiver_id={cuddler.user_id}/>
 
      <h2 className="text-2xl font-bold mt-10 mb-4">
        Avaliações
      </h2>
 
      {reviews && reviews.length > 0 ? (
        reviews.map((review: any) => (
          <div
            key={review.id}
            className="border p-4 rounded mb-3"
          >
            <strong>{review.name}</strong>
            <p>⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma avaliação ainda.</p>
      )}
 
      {/* FORMULÁRIO DE REVIEW */}
 
      <ReviewForm cuddler_id={params.id} />
 
    </main>
  )
}