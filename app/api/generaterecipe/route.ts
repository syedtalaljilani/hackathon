import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { writeFile ,unlink} from 'fs/promises';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Path } from "react-hook-form";
import test from "node:test";
const fs = require('fs');
export async function POST(request:Request){
   const genAI = new GoogleGenerativeAI("AIzaSyCRk03hn4aNJVrI_cCbbXzA0Q3wiYXSgwE");
    const model_vision = genAI.getGenerativeModel({ model: "gemini-pro-vision"});
    const model_script = genAI.getGenerativeModel({ model: "gemini-pro"});
    try{
        //fetch current user
        const user=await currentUser();
  
        //check wether logged in
        if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized",{status:401});
        }
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const img: File | null = data.get('img') as unknown as File;
        const time:string = data.get('time') as unknown as string
      
        if (!file || !img || !time) {
          return NextResponse.json({ success: false });
        }
        console.log(data);
        const pdfbytes = await file.arrayBuffer();
        const pdfbuffer = Buffer.from(pdfbytes);
        const pdfpath = `./public/upload/${file.name}`;
        await writeFile(pdfpath, pdfbuffer);
        console.log(pdfpath)
       
        const imgbytes = await img.arrayBuffer();
        const imgbuffer = Buffer.from(imgbytes);
        const imgpath = `./public/upload/${img.name}`;
        await writeFile(imgpath, imgbuffer);
        console.log(imgpath)

        const detect:string = "Detect all foods in the picture and list them in form of array in response if there is no foods in the given picture please indicate as no food materials in the picture";;

        const image = {
            inlineData: {
              data: Buffer.from(fs.readFileSync(imgpath)).toString("base64"),
              mimeType: "image/jpeg",
            },
        };
        const items = await model_vision.generateContent([detect, image]);
        console.log(items.response.text());
        const rawFoodMaterials=items.response.text()
        
        const mealTime=time
        const loader = new PDFLoader(pdfpath);

        const docs = await loader.load();
        // console.log(docs);

        // Process each Document object
        const dietDocs = docs.map(document => {
            // Remove newline characters and additional characters
            const cleanedPageContent = document.pageContent
            .replace(/\n/g, ' ') // Replace newline characters with space
            .replace(/\s+/g, ' ') // Replace multiple consecutive spaces with a single space
            .trim(); // Remove leading and trailing spaces
             return cleanedPageContent;
        });

        //validation
        const prompt=`
        As a nutrition doctor and diet recipe planner, you are tasked with analyzing a prescribed diet sheet and available raw food materials to generate a recipe. The goal is to create a balanced meal plan for a specific mealtime (breakfast, brunch, lunch, linner, or dinner) based on the prescribed diet and available ingredients.

        Prompt:
        You are given a prescribed diet sheet and a list of raw food materials. Your task is to analyze the prescribed diet sheet and available raw food materials to generate a recipe for [INSERT MEALTIME HERE]. Ensure that the recipe is balanced, nutritious, and aligns with the dietary requirements specified in the diet sheet.

        Prescribed Diet Sheet:
        ${dietDocs}

        Raw Food Materials:
-       ${rawFoodMaterials}

        Mealtime: ${mealTime}

        Output:
        Based on the prescribed diet sheet and available raw food materials, provide a detailed recipe for [INSERT MEALTIME HERE]. Include a list of ingredients and step-by-step instructions for preparing the meal. Ensure that the recipe meets the nutritional requirements specified in the diet sheet and utilizes the available raw food materials effectively.

        Example Output:
        Recipe for [INSERT MEALTIME HERE]:
        - Ingredients:
            - [LIST OF INGREDIENTS]
        - Instructions:
            1. [STEP 1]
            2. [STEP 2]
            3. [STEP 3]
            ...
        `
        const result = await model_script.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
        return NextResponse.json(text)
    }catch(error){
       
        return new NextResponse("Internal Error",{status:500})
    }
}