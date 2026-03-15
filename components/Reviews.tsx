"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Review = {
    id: string
    rating: number
    comment: string
    created_at: string
}

type Props = {
    cuddlerId: string
}

export default function Reviews({ cuddlerId }: Props) {

    const [reviews, setReviews] = useState<Review[]>([])
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")

    async function loadReviews() {

        const { data } = await supabase
            .from("reviews")
            .select("*")
            .eq("cuddler_id", cuddlerId)
            .order("created_at", { ascending: false })

        if (data) setReviews(data)

    }

    useEffect(() => {
        loadReviews()
    }, [cuddlerId])

    async function submitReview() {

        const { data: userData } = await supabase.auth.getUser()

        const user = userData.user

        if (!user) {

            alert("Login required")
            return

        }

        await supabase
            .from("reviews")
            .insert({
                cuddler_id: cuddlerId,
                user_id: user.id,
                rating,
                comment
            })

        setComment("")
        loadReviews()

    }

    const avg =
        reviews.length
            ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
            : "No ratings"

    return (

        <div className="mt-16">

            <h2 className="text-2xl font-bold mb-6">

                Reviews ⭐ {avg}

            </h2>


            {/* FORM */}

            <div className="bg-slate-800 p-4 rounded-lg mb-8">

                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mb-3 p-2 bg-slate-700 rounded"
                >

                    {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>
                            {n} ⭐
                        </option>
                    ))}

                </select>

                <textarea
                    placeholder="Leave a review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 rounded bg-slate-700 text-white mb-3"
                />

                <button
                    onClick={submitReview}
                    className="bg-purple-600 px-4 py-2 rounded"
                >

                    Submit Review

                </button>

            </div>


            {/* LIST */}

            <div className="space-y-6">

                {reviews.map(r => (
                    <div
                        key={r.id}
                        className="bg-slate-800 p-4 rounded-lg"
                    >

                        <div className="font-semibold">

                            {"⭐".repeat(r.rating)}

                        </div>

                        <p className="text-gray-300">

                            {r.comment}

                        </p>

                    </div>
                ))}

            </div>

        </div>

    )

}
