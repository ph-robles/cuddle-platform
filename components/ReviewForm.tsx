"use client"
 
import { useState } from "react"
import { supabase } from "@/lib/supabase"
 
export default function ReviewForm({cuddlerId}:any){
 
 const [rating,setRating]=useState(5)
 const [comment,setComment]=useState("")
 
 async function submit(){
 
  await supabase
   .from("reviews")
   .insert({
    cuddler_id:cuddlerId,
    rating,
    comment
   })
 
  alert("Review sent")
 
 }
 
 return(
 
  <div className="mt-6 space-y-2">
 
   <input
    type="number"
    value={rating}
    onChange={(e)=>setRating(Number(e.target.value))}
   />
 
   <textarea
    value={comment}
    onChange={(e)=>setComment(e.target.value)}
   />
 
   <button
    onClick={submit}
    className="bg-black text-white px-4 py-2"
   >
    Submit Review
   </button>
 
  </div>
 
 )
 
}
 