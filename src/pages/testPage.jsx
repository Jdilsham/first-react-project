import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import meediaUpload from "../../utils/mediaUpload";

const anonkey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZWF2cnd4Ynl2bHF3c3dqcGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxOTkwMTQsImV4cCI6MjA4NTc3NTAxNH0.k7E275NeFrVY8mwHXO2vxVVgCTFdiOT5OncMVqBzw3A"

const superbase_url = "https://uceavrwxbyvlqwswjpfm.supabase.co"

const superbase = createClient(superbase_url, anonkey)

export default function TestPage() {

    const [file, setFile] = useState(null);

    async function uploadImage(){
        const link = await meediaUpload(file)
        console.log(link);
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
           <input type="file" onChange={
            (e) => setFile(e.target.files[0])
           }></input>

           <button onClick={uploadImage} className="bg-accent">Upload</button>
        </div>
    );
}