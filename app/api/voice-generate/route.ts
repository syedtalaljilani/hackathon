
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


import { Resemble } from '@resemble/node' // If you are using es modules

Resemble.setApiKey("EqNczEgN1ItqCuc6hX50rgtt")

interface Response {
    items: any[]; 
}
interface WriteResponseV2<T> {
    item: T;
    
}
interface Clip {
    audio_src: string;
  
}

export async function POST(req:Request) {
    try{
        //data body
        const prompt:string=await req.text();
        console.log(prompt)

        //fetch current user
        const user=await currentUser();

         //check wether logged in
         if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized",{status:401});
        }
        
        const voice_clip = await Resemble.v2.clips.createSync("7bc9ec89",{
            body: prompt,
            voice_uuid:"b2d1bb75",
            is_public: false,
            is_archived: false
        });
        console.log(voice_clip)
        const audio_src=(voice_clip as WriteResponseV2<Clip>).item.audio_src;
        //const audio_src=`https://app.resemble.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCRkhBbHcwPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--adfb833e29531e8d97d4db1f8275ff54e58006be/result.wav`
        console.log(audio_src)
        return new NextResponse(audio_src, { status: 200 });
    }catch(error){
        return new NextResponse("An error occured",{status:404});
    }
}