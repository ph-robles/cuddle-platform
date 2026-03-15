"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Notification = {
    id: string
    text: string
}

export default function Notifications() {

    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {

        async function load() {

            const { data: userData } = await supabase.auth.getUser()

            const user = userData.user

            if (!user) return

            const { data } = await supabase
                .from("notifications")
                .select("*")
                .eq("user_id", user.id)

            if (data) setNotifications(data)

        }

        load()

    }, [])

    return (

        <div className="relative">

            🔔 {notifications.length}

        </div>

    )

}
