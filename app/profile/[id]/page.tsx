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
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
 
      <h1>{cuddler.name}</h1>
 
      <Image
        src={cuddler.photo}
        alt={cuddler.name}
        width={300}
        height={300}
        style={{ borderRadius: 12 }}
      />
 
      <p style={{ marginTop: 20 }}>
        {cuddler.description}
      </p>
 
      <p>
        <strong>Cidade:</strong> {cuddler.city}
      </p>
 
      <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 20 }}>
        ${cuddler.price} / hour
      </p>
 
      {/* BOTÃO / FORMULÁRIO DE MENSAGEM */}
 
      <MessageForm receiver_id={cuddler.user_id}/>
 
      <h2 style={{ marginTop: 40 }}>
        Avaliações
      </h2>
 
      {reviews && reviews.length > 0 ? (
        reviews.map((review: any) => (
          <div
            key={review.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              marginTop: 10
            }}
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