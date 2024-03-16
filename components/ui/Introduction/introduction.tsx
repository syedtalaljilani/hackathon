'use client';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
const phrase = "Introducing WithEasiness, an innovative project poised to revolutionize the realm of AI-driven video creation, job validation, and website interaction. With WithEasiness, users can effortlessly generate AI-powered videos by providing prompts, allowing for seamless content creation without the need for extensive technical expertise. Moreover, WithEasiness offers a unique feature for validating job descriptions by comparing them with user resumes, streamlining the job application process and ensuring alignment between candidate skills and employer expectations. Additionally, WithEasiness enables users to engage in dynamic conversations with websites, enhancing online interactions and facilitating smoother browsing experiences. With its multifaceted capabilities, WithEasiness empowers users to navigate various digital tasks with unparalleled ease and efficiency.";

const Introduction: React.FC = () => {
  let refs = useRef<(HTMLSpanElement | null)[]>([]);
  const body = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLMapElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, [])

  const createAnimation = () => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current!,
        scrub: true,
        start:'top',
        end: `+=${window.innerHeight}`,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.5
    })
  }

  const splitWords = (phrase: string) => {
    let bodyElements: JSX.Element[] = [];
    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);
      bodyElements.push(<pre className='text-2xl sm:text-4xl mr-4 leading-[80px] sm:leading-[80px]' key={word + "_" + i}>{letters}</pre>)
    })
    return bodyElements;
  }

  const splitLetters = (word: string) => {
    let letters: JSX.Element[] = [];
    word.split("").forEach((letter, i) => {
      letters.push(<span className='opacity-[0.3]' key={letter + "_" + i} ref={el => { if (el) refs.current.push(el) }}>{letter}</span>)
    })
    return letters;
  }

  return (
    <main ref={container}>
      <div ref={body} className='flex flex-wrap w-[90%] h-fit'>
        {splitWords(phrase)}
      </div>
    </main>
  )
}

export default Introduction;
