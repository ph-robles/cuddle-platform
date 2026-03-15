"use client";
 
import { useState } from "react";
import { supabase } from "@/lib/supabase";
 
export default function UploadPhoto() {
 
  const [uploading, setUploading] = useState(false);
 
  async function uploadFile(event:any){
 
    const file = event.target.files[0];
 
    if(!file) return;
 
    setUploading(true);
 
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`public/${Date.now()}-${file.name}`, file);
 
    if(error){
      alert("Erro no upload");
      console.log(error);
    } else {
      alert("Foto enviada!");
    }
 
    setUploading(false);
 
  }
 
  return(
 
    <div className="mt-4">
 
      <input
        type="file"
        onChange={uploadFile}
      />
 
      {uploading && <p>Enviando...</p>}
 
    </div>
 
  );
 
}
 