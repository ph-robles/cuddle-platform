import Link from "next/link"
import { motion } from "framer-motion"
 
export default function Home(){
 
  return(
 
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
 
      <div className="max-w-3xl text-center">
 
        <motion.h1
          initial={{opacity:0,y:-20}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.6}}
          className="text-5xl font-bold mb-8"
        >
          Welcome to Cuddle Platform
        </motion.h1>
 
        <p className="text-gray-600 mb-12 text-lg">
          Choose how you want to use the platform
        </p>
 
        <div className="grid md:grid-cols-2 gap-8">
 
          <motion.div
            whileHover={{scale:1.05}}
            className="bg-white p-10 rounded-xl shadow-lg"
          >
 
            <h2 className="text-2xl font-bold mb-4">
              I am a Cuddler
            </h2>
 
            <p className="text-gray-500 mb-6">
              Offer your cuddling services
            </p>
 
            <Link
              href="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded"
            >
              Create Profile
            </Link>
 
          </motion.div>
 
          <motion.div
            whileHover={{scale:1.05}}
            className="bg-white p-10 rounded-xl shadow-lg"
          >
 
            <h2 className="text-2xl font-bold mb-4">
              I'm Looking for a Cuddler
            </h2>
 
            <p className="text-gray-500 mb-6">
              Find cuddling services near you
            </p>
 
            <Link
              href="/explore"
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Find Cuddlers
            </Link>
 
          </motion.div>
 
        </div>
 
      </div>
 
    </main>
 
  )
 
}
 