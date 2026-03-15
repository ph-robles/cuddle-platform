"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Props = {
    open: boolean
    onClose: () => void
}

export default function AuthModal({ open, onClose }: Props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    if (!open) return null

    async function handleLogin() {

        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {

            alert(error.message)

        } else {

            window.location.reload()

        }

        setLoading(false)

    }

    async function handleSignup() {

        setLoading(true)

        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {

            alert(error.message)

        } else {

            alert("Account created!")

        }

        setLoading(false)

    }

    return (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-slate-900 p-8 rounded-xl w-[400px]">

                <h2 className="text-2xl font-bold mb-6 text-white">

                    Login or Signup

                </h2>

                <input
                    placeholder="Email"
                    className="w-full mb-3 p-3 rounded bg-slate-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex gap-3">

                    <button
                        onClick={handleLogin}
                        className="bg-purple-600 px-4 py-2 rounded w-full"
                    >

                        Login

                    </button>

                    <button
                        onClick={handleSignup}
                        className="border border-purple-500 px-4 py-2 rounded w-full text-white"
                    >

                        Signup

                    </button>

                </div>

                <button
                    onClick={onClose}
                    className="text-gray-400 mt-4 text-sm"
                >

                    Cancel

                </button>

            </div>

        </div>

    )

}
