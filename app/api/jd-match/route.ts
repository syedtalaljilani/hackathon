import { writeFile ,unlink} from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(request: NextRequest) {
  const genAI = new GoogleGenerativeAI("AIzaSyCRk03hn4aNJVrI_cCbbXzA0Q3wiYXSgwE");
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    try{
  
        //fetch current user
        const user=await currentUser();
  
        //extracting all the things we need from body
        //const {Url}=body
  
        //check wether logged in
        if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized",{status:401});
        }
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
      
        if (!file) {
          return NextResponse.json({ success: false });
        }
      
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = `./public/upload/${file.name}`;
        await writeFile(path, buffer);
        
        const loader = new PDFLoader(path);

        const docs = await loader.load();
        console.log(docs);

        // Process each Document object
        const processedDocuments = docs.map(document => {
            // Remove newline characters and additional characters
            const cleanedPageContent = document.pageContent
            .replace(/\n/g, ' ') // Replace newline characters with space
            .replace(/\s+/g, ' ') // Replace multiple consecutive spaces with a single space
            .trim(); // Remove leading and trailing spaces
             return cleanedPageContent;
        });
        console.log(processedDocuments)

        //validation
        const jd=data.get('jd');
        console.log(jd);
        const prompt=`
        Hey Act Like a skilled or very experience ATS(Application Tracking System)
        with a deep understanding of tech field,software engineering,data science ,data analyst
        and big data engineer. Your task is to evaluate the resume based on the given job description.
        You must consider the job market is very competitive and you should provide 
        best assistance for improving thr resumes. Assign the percentage Matching based 
        on Jd and
        the missing keywords with high accuracy
        resume:${processedDocuments}
        description:${jd}
        
        I want the response in one single string having the structure that is MissingQualification and ProfileSummary should be in multiline
         JDMatch %
         MissingQualification:
         ProfileSummary:
        `
       const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
        await unlink(path)
        return NextResponse.json(text)
    }catch(error){
       
        return new NextResponse("Internal Error",{status:500})
    }

}