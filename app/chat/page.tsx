"use client"
 
import Chat from "@/components/Chat"
 
export default function ChatPage(){
 
 const receiverId = "demo-user"
 
 return(
 
 <div className="max-w-2xl mx-auto p-6">
 
 <h1 className="text-2xl font-bold mb-6">
 
 Chat
 
 </h1>
 
 <Chat receiverId={receiverId}/>
 
 </div>
 
 )
 
}
 