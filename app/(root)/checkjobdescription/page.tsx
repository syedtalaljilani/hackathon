'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react'

export default function CheckJobDescription() {
  const [file, setFile] = useState<File>();
  const [jd,setJD] = useState('')
  const [summary,setSummary] = useState()
  const ref = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set('file', file);
      data.set('jd',jd)
      const res = await fetch('api/jd-match', {
        method: 'POST',
        body: data,
      });
      const temp = await res.json()
      setSummary(temp)
      if (!res.ok) throw new Error(await res.text());

      ref.current && (ref.current.value = '');

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='p-2 sm:p-5'>
  <form onSubmit={submit} className='ring-2 ring-white p-3 sm:p-10 rounded-sm flex flex-col gap-6'>
  <label htmlFor='jd' className='text-lg'>Job Description</label>
<textarea
  id='jd'
  name='jd'
  onChange={(e) => setJD(e.target.value)}
  className='h-[400px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
  placeholder='Enter Your Job Description'
/>

    <Label className='text-lg'>Upload Your Resume</Label>
<div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">please upload a .pdf</p>
            <p>{file?.name}</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0])}/>
    </label>
</div> 

    {/* Submit button */}
    <input type="submit" value="Check The Validation" className="bg-white text-black hover:font-bold hover:bg-green-500 rounded-md px-4 py-2 hover:text-white mt-2 inline-block" />
    <pre className='text-white text-normal'>{summary}</pre>
  </form>
</main>

  );
}