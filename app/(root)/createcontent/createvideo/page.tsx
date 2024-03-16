"use client"
import axios from "axios";
//react hook
import { useRef, useState } from "react";

//form validation
import * as z from "zod";
import {useForm } from "react-hook-form";//hook
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, 
    FormControl,
    FormDescription,
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";//form

//ui
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue  } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { ScriptDisplay } from "@/components/script-display"
interface GeneratedScript {
    video_title: string;
    video_description: string;
    scripts: {
      part1: {
        text: string;
        image: string;
      };
      part2: {
        text: string;
        image: string;
      };
      part3: {
        text: string;
        image: string;
      };
      part4: {
        text: string;
        image: string;
      };
      part5: {
        text: string;
        image: string;
      };
    };
  }
 


const formSchema=z.object({
    topic:z.string().min(4,{
        message:"Topic is Required"
    }),
    instructions:z.string(),
    duration:z.number().max(120,{
        message:"Maximum 120s of video can generate"
    }),
    language:z.string(),
    images:z.number().max(12,{
        message:"Maximum upto 12 images"
    }),
    genre:z.string()
    

})


const VideoForm =() => {
    //hooks for toasters
    const {toast}=useToast();
    /* useState<GeneratedScript>({
        video_title: "",
        video_description: "",
        scripts: {
          part1: { text: "", image: "" },
          part2: { text: "", image: "" },
          part3: { text: "", image: "" },
          part4: { text: "", image: "" },
          part5: { text: "", image: "" },
        },
    });*/
    const [generatedScript,setGeneratedScript] = useState<GeneratedScript | null>(null);
    //router

    const [script,setScript]=useState(false);

    //form controller
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            topic:"",
            instructions:"",
            duration:30,
            language:undefined, //bcz: it is select component
            images:5,
            genre:""
            
        }
    })

    //loading state of the from controller
    const isLoading=form.formState.isSubmitting;


    //languages
    const categories:Array<any>=["en","hi"]

    //action
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            //creating new companion functionality
            const response=await axios.post("http://localhost:5000/script",values)
            console.log("response")
            console.log(response)
            const data=response.data
            console.log("data")
            console.log(data)
            console.log("###########################################################")
            console.log(script)
            if(data){    
                setGeneratedScript(data);
                setScript(true)
                
            }
            //console.log("generated script")
            //console.log(generatedScript)
            
            
           toast({
                description:"Success"
            });
        }catch(error){
            toast({
                variant:"destructive",
                description:"Something went wrong"
            })
        }
    }


    
    return ( 
        <div className="md:h-[100%] ring-2 ring-green-500 rounded-sm m-10 p-4 space-y-2 max-w-7xl mx-auto">
            {!script && <Form {...form}>   
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-3xl mb-2 font-medium my-10">
                                Video Generation
                            </h3>
                            <p className="text-sm text-muted-foreground my-5">
                                General information about video to generate
                            </p>
                        </div>
                        
                    </div>
                    <Separator className="bg-primary/10 my-10"/>
                    {/*fields*/}
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/*1*/}
                        <FormField 
                            name="topic"
                            control={form.control}
                            render={({field})=>(
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Topic of video</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder="eg: Facts about Human psychology"
                                            {...field}
                                            className="h-[60px]"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is the topic of content to generate your video
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}      
                        />
                        {/*2*/}
                        <FormField 
                            name="instructions"
                            control={form.control}
                            render={({field})=>(
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder="eg: Start with pleasant intro"
                                            {...field}
                                            className="h-[60px]"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Instructions about create Video(Optional)
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}      
                        />
                        {/*3*/}
                        <FormField 
                            name="duration"
                            control={form.control}
                            render={({field})=>(
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="number"
                                            disabled={isLoading}
                                            placeholder="eg: 30"
                                            {...field}
                                            className="h-[60px]"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Duration of Video(in seconds)
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}      
                        />
                        {/*4*/}
                        <FormField 
                            name="language"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background h-[60px] w-[90vw] sm:w-full">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a language"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category)=>(
                                                <SelectItem
                                                    value={category}
                                                >
                                                    {category}

                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a Language for your video
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>

                            )}      
                        />
                        {/*5*/}
                        <FormField 
                            name="images"
                            control={form.control}
                            render={({field})=>(
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number" 
                                            disabled={isLoading}
                                            placeholder="eg: 5"
                                            {...field}
                                            className="h-[60px]"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Number of images to render in your video
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}      
                        />
                        {/*6*/}
                        <FormField 
                            name="genre"
                            control={form.control}
                            render={({field})=>(
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Genre</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder="eg: Scary | Casual etc.."
                                            {...field}
                                            className="h-[60px]"

                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The genre for the script(Optional)
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}      
                        />
                    
                    </div>
                     {/*second section 1st field*/}
                     <Separator className="bg-primary/10 my-10"/>
                     
                        <div className="w-full flex justify-center mt-3">
                            <Button size="lg" disabled={isLoading} className="hover:bg-green-500 hover:text-white hover:font-bold">
                                    Create your Script 
                                    <span className="icon-[ion--sparkles] ml-2"></span>
                            </Button>

                        </div>
                </form>
            </Form>
        }
        {generatedScript!=null && script &&
            <ScriptDisplay {...generatedScript}/>
        }
        </div>
     );
}
 
export default VideoForm;