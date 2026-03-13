'use client'
 
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
 
export default function Dashboard(){
 
  const [profile,setProfile] = useState<any>(null)
  const [loading,setLoading] = useState(true)
 
  useEffect(()=>{
    loadProfile()
  },[])
 
  async function loadProfile(){
 
    const { data:userData } = await supabase.auth.getUser()
 
    const user = userData.user
 
    if(!user){
      alert("You must be logged in")
      return
    }
 
    const { data } = await supabase
      .from("cuddlers")
      .select("*")
      .eq("user_id",user.id)
      .single()
 
    setProfile(data)
    setLoading(false)
 
  }
 
  async function updateProfile(e:any){
 
    e.preventDefault()
 
    const { error } = await supabase
      .from("cuddlers")
      .update({
        name:profile.name,
        city:profile.city,
        state:profile.state,
        bio:profile.bio,
        price:profile.price
      })
      .eq("id",profile.id)
 
    if(error){
      alert("Error updating profile")
    }else{
      alert("Profile updated!")
    }
 
  }
 
  if(loading){
    return(
      <div className="p-10">
        Loading dashboard...
      </div>
    )
  }
 
  if(!profile){
    return(
      <div className="p-10">
        You haven't created a cuddler profile yet.
      </div>
    )
  }
 
  return(
 
    <main className="max-w-xl mx-auto p-10">
 
      <h1 className="text-3xl font-bold mb-6">
        Your Dashboard
      </h1>
 
      <form onSubmit={updateProfile} className="flex flex-col gap-4">
 
        <input
        className="border p-3"
        value={profile.name}
        onChange={(e)=>setProfile({...profile,name:e.target.value})}
        />
 
        <input
        className="border p-3"
        value={profile.city}
        onChange={(e)=>setProfile({...profile,city:e.target.value})}
        />
 
        <input
        className="border p-3"
        value={profile.state}
        onChange={(e)=>setProfile({...profile,state:e.target.value})}
        />
 
        <textarea
        className="border p-3"
        value={profile.bio}
        onChange={(e)=>setProfile({...profile,bio:e.target.value})}
        />
 
        <input
        type="number"
        className="border p-3"
        value={profile.price}
        onChange={(e)=>setProfile({...profile,price:e.target.value})}
        />
 
        <button className="bg-black text-white p-3 rounded">
          Update Profile
        </button>
 
      </form>
 
    </main>
 
  )
 
}