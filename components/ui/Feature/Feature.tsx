
"use client"
import Link from 'next/link'
import { motion } from 'framer-motion';
import React from 'react'
import { useInView } from 'react-intersection-observer';
export default function Feature() {
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger animation once
        threshold: 0.2, // Percentage of the element's visibility needed to trigger the animation
      });
  return (
    <>
    <motion.section 
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 }:{}}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-gray-900 w-fit "
    >
    <div className="px-6 py-10 mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={inView ?{ y: 0, opacity: 1 }:{}}
          ref={ref}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white"
        >
          <br/>Create,Validate,Chat <span className="underline decoration-green-500">With Easiness</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={inView ?{ y: 0, opacity: 1 }:{}}
          ref={ref}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300"
        >
        Creating, validating, and engaging in effortless conversation are integral elements of effective communication. With a keen eye for detail and a knack for articulation, one can effortlessly craft compelling narratives that resonate with their audience. Validation, whether through research or empathetic understanding, lends credibility and depth to one's message, fostering meaningful connections. And through open dialogue, curiosity, and active listening, individuals can navigate conversations with ease, fostering understanding and forging bonds that transcend barriers.
        </motion.p>
        
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={inView?{ y: 0, opacity: 1 }:{}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3"
        >
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={inView ?{ y: 0, opacity: 1 }:{}}
              transition={{ delay: 0.8 }}
              className="p-8 space-y-3 border-2 border-green-400 dark:border-green-300 rounded-xl"
            >
                <span className="inline-block text-green-500 dark:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 100 0l2.122 2.122a3 3 0 000 4.243L0 8l4.243-4.243a3 3 0 014.243 4.243L8 8l4.243 4.243a3 3 0 01-4.243 4.243L8 15.757a3 3 0 01-2.121.88z" />
                    </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Create Content</h1>

                <p className="text-gray-500 dark:text-gray-300">
                Our new AI-powered multimedia generation feature seamlessly combines text, audio, images, and GIFs to create engaging and dynamic content. Users can input their text, and the AI intelligently selects relevant images and GIFs while synthesizing natural-sounding. </p>

                <Link href="/createcontent" className="inline-flex p-2 text-green-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-green-400 dark:text-white hover:underline hover:text-green-600 dark:hover:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
            </motion.div>

            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={inView ?{ y: 0, opacity: 1 }:{}}
              transition={{ delay: 1 }}
              className="p-8 space-y-3 border-2 border-green-400 dark:border-green-300 rounded-xl"
            >
                <span className="inline-block text-green-500 dark:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Validate Job Description</h1>

                <p className="text-gray-500 dark:text-gray-300">
                The "Validate Job Description with your resume by uploading PDF" feature streamlines the job application process by allowing users to effortlessly verify their qualifications against specific job descriptions. By simply uploading their resume in PDF format.</p>

                <Link href="/checkjobdescription" className="inline-flex p-2 text-green-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-green-400 dark:text-white hover:underline hover:text-green-600 dark:hover:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
            </motion.div>

            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={inView ?{ y: 0, opacity: 1 }:{}}
              transition={{ delay: 1.2 }}
              className="p-8 space-y-3 border-2 border-green-400 dark:border-green-300 rounded-xl"
            >
                <span className="inline-block text-green-500 dark:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Chat with content</h1>

                <p className="text-gray-500 dark:text-gray-300">
                Chat with Content is an innovative and dynamic communication platform that seamlessly integrates various multimedia elements, including text, images, videos, audio, PDFs, and GIFs, into the conversational experience.
                </p>

                <Link href="/chatwithcontent" className="inline-flex p-2 text-green-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-green-400 dark:text-white hover:underline hover:text-green-600 dark:hover:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
            </motion.div>

            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={inView ?{ y: 0, opacity: 1 }:{}}
              transition={{ delay: 1.4 }}
              className="p-8 space-y-3 border-2 border-green-400 dark:border-green-300 rounded-xl"
            >
                <span className="inline-block text-green-500 text-3xl dark:text-green-500">
                <span className="icon-[streamline--food-barbeque-pot-cook-grill-bbq-drink-cooking-nutrition-pot-barbecue-grilling-food-cauldron]"></span>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Generate Recipe</h1>

                <p className="text-gray-500 dark:text-gray-300">
                Our innovative recipe generator leverages advanced image recognition technology to analyze photos of available raw materials in your kitchen. Coupled with personalized dietary recommendations from your doctor to manage your specific health condition, whether it's diabetes, hypertension, or any other ailment, the system crafts tailored recipes that align with both your dietary restrictions and health goals. 
                </p>

                <Link href="/generaterecipe" className="inline-flex p-2 text-green-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-green-400 dark:text-white hover:underline hover:text-green-600 dark:hover:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
            </motion.div>
        </motion.div>
    </div>
</motion.section>
    </>

  )
}
