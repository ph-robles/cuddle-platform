'use client'
 
import { useState } from "react"
import { supabase } from "../lib/supabase"
 
export default function ReviewForm({ cuddler_id }: any) {
 
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
 
  async function submitReview(e:any){
 
    e.preventDefault()
 
    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          cuddler_id,
          rating,
          comment
        }
      ])
 
    if(error){
      alert("Error sending review")
    }else{
      alert("Review added")
      location.reload()
    }
 
  }
 
  return (
 
    <form onSubmit={submitReview} className="mt-10 flex flex-col gap-3">
 
      <h3 className="text-xl font-bold">
        Leave a review
      </h3>
 
      <select
        value={rating}
        onChange={(e)=>setRating(Number(e.target.value))}
        className="border p-2"
      >
        <option value="5">5 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="1">1 ⭐</option>
      </select>
 
      <textarea
        placeholder="Write your experience"
        className="border p-3"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
      />
 
      <button className="bg-black text-white p-3 rounded">
        Submit Review
      </button>
 
    </form>
 
  )
 
}