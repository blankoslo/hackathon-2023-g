"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Header } from "@/components/Header";
import { Video } from "@/components/Video";
import { VinylRecord } from "@/components/VinylRecord";
import { useRef, useState } from "react";
import Marquee from "react-fast-marquee";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const date = new Date();
  const location = "Oslo, Norge";
  const headlines = [
    {
      title: "tre personer arrestert for smugling",
    },
    {
      title: "tre personer arrestert for smugling",
    },
  ];

  const handlePlayClick = () => {
    const nextIsPlaying = !isPlaying;
    nextIsPlaying ? videoRef.current?.play() : videoRef.current?.pause();
    setIsPlaying(nextIsPlaying);
  };
  return (
    <main className="flex items-center justify-center">
      <div
        className="text-black h-screen w-[50vh] rounded-3xl"
        style={{
          background: "#E6CEB9",
        }}
      >
        <div className="px-8 py-4">
          <Header>
            <Header.Logo />
            <Header.Date date={date} location={location} />
          </Header>
        </div>
        <div className="px-8">
          <Video
            src={"/video/result_voice.mp4"}
            type="video/mp4"
            ref={videoRef}
          />
        </div>
        <div className="pt-2 pb-8">
          <Marquee>
            {headlines.map((headline, i) => {
              return (
                <div
                  className="bg-black mx-1 text-white flex uppercase shrink-0 w-fit p-2"
                  key={i}
                >
                  {headline.title}
                </div>
              );
            })}
          </Marquee>
        </div>

        <div className="">
          <button className="bg-black rounded-full h-[10vh] w-[10vh]" />
          <div className="relative h-[35vh] w-[35vh] mx-auto">
            <VinylRecord
              title="Tre arrestert"
              isPlaying={isPlaying}
              handleClick={handlePlayClick}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
