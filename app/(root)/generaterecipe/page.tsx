'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react'

export default function CheckJobDescription() {
  const [file, setFile] = useState<File>();
  const [img, setImage] = useState<File>();
  const [time,setTime] = useState('')
  const [recipe,setRecipe] = useState('')  
  const ref = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !img) return;
    try {
      const data = new FormData();
      data.set('file', file);
      data.set('time',time)
      data.set('img',img)
      const res = await fetch('api/generaterecipe', {
        method: 'POST',
        body: data,
      });
       const temp = await res.json()
       setRecipe(temp)
      if (!res.ok) throw new Error(await res.text());

      ref.current && (ref.current.value = '');

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='p-2 sm:p-5'>
  <form onSubmit={submit} className='ring-2 ring-white p-3 sm:p-10 rounded-sm flex flex-col gap-6'>
  <label htmlFor='jd' className='text-lg'>Time</label>
<input
  id='time'
  name='time'
  onChange={(e) => setTime(e.target.value)}
  className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
  placeholder='Enter Your Time (eg 10:00PM)'
/>

  <Label className='text-lg'>Upload The Picture of Cooking ingredients</Label>
<div className="flex items-center justify-center w-full">
    <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">please upload a .png or .jpg</p>
            <p className='text-white text-lg'>{img?.name}</p>
        </div>
        <input id="image" type="file" className="hidden" onChange={(e) => setImage(e.target.files?.[0])}/>
    </label>
</div> 
<Label className='text-lg'>Upload The Diet Prescription of the Doctor</Label>
<div className="flex items-center justify-center w-full">
    <label htmlFor="pdf" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">please upload a .pdf</p>
            <p>{file?.name}</p>
        </div>
        <input id="pdf" type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0])}/>
    </label>
</div> 
    {/* Submit button */}
    <input type="submit" value="Generate Recipe" className="bg-white text-black hover:font-bold hover:bg-green-500 rounded-md px-4 py-2 hover:text-white mt-2 inline-block" />
    <pre className='text-white text-normal'>{recipe}</pre>
  </form>
  
</main>

  );
}