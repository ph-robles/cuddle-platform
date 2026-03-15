"use client"
 
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
 
export default function Landing(){
 
return(
 
<div className="bg-slate-950 text-white min-h-screen">
 
{/* NAVBAR */}
 
<nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
 
<h1 className="text-2xl font-bold text-purple-400">
CuddleConnect
</h1>
 
<div className="flex gap-6">
 
<Link href="/explore">Find Cuddlers</Link>
<Link href="/login">Login</Link>
 
</div>
 
</nav>
 
 
{/* HERO */}
 
<section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center p-10">
 
<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
>
 
<h1 className="text-5xl font-bold leading-tight mb-6">
 
Human connection
<br/>
made simple
 
</h1>
 
<p className="text-gray-400 mb-8">
 
Find professional cuddlers near you for safe,
platonic sessions focused on relaxation,
emotional wellbeing and human connection.
 
</p>
 
<div className="flex gap-4">
 
<Link
href="/explore"
className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
>
 
Find a Cuddler
 
</Link>
 
<Link
href="/signup"
className="border border-purple-600 px-6 py-3 rounded-lg"
>
 
Become a Cuddler
 
</Link>
 
</div>
 
</motion.div>
 
 
<Image
src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2"
alt="cuddle"
width={500}
height={400}
className="rounded-xl"
/>
 
</section>
 
 
 
{/* HOW IT WORKS */}
 
<section className="max-w-6xl mx-auto py-20">
 
<h2 className="text-3xl font-bold text-center mb-12">
 
How it works
 
</h2>
 
<div className="grid md:grid-cols-3 gap-10">
 
<div className="bg-slate-800 p-6 rounded-xl">
 
<h3 className="text-xl font-semibold mb-2">
Find a cuddler
</h3>
 
<p className="text-gray-400">
 
Browse nearby professionals on the map.
 
</p>
 
</div>
 
 
<div className="bg-slate-800 p-6 rounded-xl">
 
<h3 className="text-xl font-semibold mb-2">
Chat safely
</h3>
 
<p className="text-gray-400">
 
Discuss boundaries and session details.
 
</p>
 
</div>
 
 
<div className="bg-slate-800 p-6 rounded-xl">
 
<h3 className="text-xl font-semibold mb-2">
Book a session
</h3>
 
<p className="text-gray-400">
 
Schedule your cuddle experience.
 
</p>
 
</div>
 
</div>
 
</section>
 
 
 
{/* CTA */}
 
<section className="text-center py-20">
 
<h2 className="text-4xl font-bold mb-6">
 
Ready to experience human connection?
 
</h2>
 
<Link
href="/explore"
className="bg-pink-500 px-8 py-4 rounded-lg text-lg"
>
 
Find Cuddlers Near You
 
</Link>
 
</section>
 
 
</div>
 
)
 
}
 