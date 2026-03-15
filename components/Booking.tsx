"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Props = {
    cuddlerId: string
}

export default function Booking({ cuddlerId }: Props) {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    async function book() {

        const { data } = await supabase.auth.getUser()

        const user = data.user

        if (!user) return alert("Login required")

        await supabase
            .from("bookings")
            .insert({
                cuddler_id: cuddlerId,
                user_id: user.id,
                date,
                time
            })

        alert("Booking request sent!")

    }

    return (

        <div className="bg-slate-800 p-4 rounded-xl mt-10">

            <h2 className="text-xl font-bold mb-4">

                Book Session

            </h2>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 mb-3 bg-slate-700 rounded"
            />

            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 mb-3 bg-slate-700 rounded"
            />

            <button
                onClick={book}
                className="bg-purple-600 px-4 py-2 rounded"
            >

                Request Booking

            </button>

        </div>

    )

}
