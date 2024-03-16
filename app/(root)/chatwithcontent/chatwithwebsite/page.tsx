"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { useState } from 'react';

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function ChatwithWebsite() {
  const [Url,setUrl]=useState('');
  const [scrapeSuccess, setScrapeSuccess] = useState(false);
  //hooks for toasters
  const {toast}=useToast();

   //url validation
   const isValidURL=(url:string):boolean=>{
    const regex = /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    return regex.test(url);
  }
  //handle submit function
  const handleSubmitUrl=async()=>{
    if(Url.length>0){
        const validUrl:boolean=isValidURL(Url);
        console.log(validUrl)
        if(validUrl){
            try {
                //scraping the data using beatufullsoup at the backend use of python
                //flask end point
                await axios.post(`/api/vector/`,Url)
                console.log("Done!");
                setScrapeSuccess(true);
                if(scrapeSuccess){
                  toast({
                    description:"Success"
                  });
                }
              } 
              catch (error) {
                console.error('Error:', error);
              }                     
        }else{
          toast({
            variant:"destructive",
            description:"Enter valid URL"
          })
        }
    }
  }
  
  return (
    <>
    <div className="ring-2 ring-white pr-3 pl-3 pt-10 pb-10 m-20 rounded-md flex flex-col justify-center items-center h-[60vh] gap-5">
    <h2 className='text-3xl sm:text-5xl text-center mt-3 font-mono'>Chat with Website</h2>
    {!scrapeSuccess&&
      <Input
            onChange={(e) => setUrl(e.target.value)}
            value={Url}
            placeholder='Enter Your Website Url'
            className='w-[100%] sm:w-[80%] mb-10 h-[50px]'
      />
    }
      <div>
        {!scrapeSuccess&&
            <Button onClick={()=>handleSubmitUrl()}>Scrape</Button>
        }
      {scrapeSuccess &&
        <Link href='/chatwithcontent/chatwithwebsite/chatbox' className='bg-white text-black px-20 py-5 rounded-sm hover:bg-green-500 hover:text-white hover:font-bold'>Let's Chat</Link>
      }
    </div>
    </div>
    </>
    
  )
}
