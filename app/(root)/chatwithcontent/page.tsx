"use client"
import React from "react";
import Link from "next/link";
export default function ChatWithContent() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center h-fit">
        <div className="h-[300px] sm:h-[500px] w-[90%] md:w-[350px] md:gap-10  hover:ring-4 hover:ring-green-500 ring-1 rounded-lg flex flex-col items-center justify-center ring-white mb-3 mt-5">
          <span className="icon-[streamline--browser-website-1] text-6xl  text-green-500 mb-2"></span>
          <p className="text-4xl mt-2">Chat With Website</p>
          <p className="text-sm leading-[1.5rem] m-2 text-justify ">
            With the capability to Chat With Any Website, the possibilities for
            seamless interaction and access to information are truly endless.
          </p>
          <Link
            href="/chatwithcontent/chatwithwebsite"
            className="ring-2 mt-[20px] ring-black rounded-sm bg-white p-[10px] text-black hover:bg-green-500 hover:text-white hover:font-semibold"
          >
            Let's Chat with Website
          </Link>
        </div>
      </div>
      <div>
        <h3 className="text-4xl ml-5 mt-5">Upcoming Projects</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center h-fit">
        <div className=" h-[300px] sm:h-[500px] w-[90%] md:w-[350px] md:gap-10 hover:ring-4 hover:ring-green-500 ring-1 rounded-lg flex  flex-col items-center justify-center ring-white mt-5">
          <span className="icon-[fluent--document-pdf-32-regular] text-6xl text-green-500 mb-2"></span>
          <p className="text-4xl mt-2">Chat With PDF</p>
          <p className="text-sm leading-[1.5rem] m-2 text-justify">
            With the capability to Chat With Any PDF, the possibilities for
            seamless interaction and access to information are truly endless.
          </p>
          <Link
            href=""
            className="ring-2 mt-[20px] ring-black rounded-sm bg-white p-[10px] text-black hover:bg-green-500 hover:text-white hover:font-semibold"
          >
            Let's Chat with PDF
          </Link>
        </div>
        <div className="h-[300px] sm:h-[500px] w-[90%] md:w-[350px] md:gap-10  hover:ring-4 hover:ring-green-500 ring-1 rounded-lg flex flex-col items-center justify-center ring-white mt-5">
          <span className="icon-[material-symbols--video-library-rounded] text-6xl text-green-500 mb-2"></span>
          <p className="text-4xl mt-2">Chat With Video</p>
          <p className="text-sm leading-[1.5rem] m-2 text-justify">
            With the capability to Chat With Any Video, the possibilities for
            seamless interaction and access to information are truly endless.
          </p>
          <Link
            href=""
            className="ring-2 mt-[20px] ring-black rounded-sm bg-white p-[10px] text-black hover:bg-green-500 hover:text-white hover:font-semibold"
          >
            Let's Chat with Video
          </Link>
        </div>
      </div>
    </div>
  );
}
