import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const anonkey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZWF2cnd4Ynl2bHF3c3dqcGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxOTkwMTQsImV4cCI6MjA4NTc3NTAxNH0.k7E275NeFrVY8mwHXO2vxVVgCTFdiOT5OncMVqBzw3A"

const superbase_url = "https://uceavrwxbyvlqwswjpfm.supabase.co"

const superbase = createClient(superbase_url, anonkey)

//  superbase.storage.from("images").upload(file.name, file, {
//             upsert: false,
//             cacheControl: '3600',
//         }).then(
//             () => {
//                 const publicurl = superbase.storage.from("images").getPublicUrl(file.name)
//                 console.log(publicurl);
//             }
//         )

export default function meediaUpload(file){
    return new Promise(
        
    )
    
}