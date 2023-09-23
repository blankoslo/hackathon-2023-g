"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Header } from "@/components/Header";
import { Video } from "@/components/Video";
import { VinylRecord } from "@/components/VinylRecord";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<Map<number, HTMLButtonElement>>(new Map());
  const [activeId, setActiveId] = useState(0);
  useEffect(() => {
    const node = scrollRef.current.get(0);
    if (node) {
      node.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  const handleClick = (id: number) => () => {
    const node = scrollRef.current.get(id);
    if (node) {
      setActiveId(id);
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const records = [
    { title: "Tre arresetert" },
    { title: "Forstyrelser på smøgen" },
    { title: "Synkehull på e6" },
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

        <div className="overflow-hidden">
          <div
            className="flex gap-x-4"
            style={{
              width: `${
                35 * (records.length + 2) + (records.length - 3) * 16
              }vh`,
            }}
          >
            <div className="h-[35vh] w-[35vh]"></div>
            {records.map((record, id) => {
              return (
                <div
                  key={id}
                  className={classNames(
                    "relative h-[35vh] w-[35vh] mx-auto transition-all duration-500",
                    {
                      "opacity-20 scale-90": id !== activeId,
                    }
                  )}
                >
                  <VinylRecord
                    title={record.title}
                    isPlaying={isPlaying}
                    handleClick={handleClick(id)}
                    ref={(node) => {
                      if (node) {
                        scrollRef.current.set(id, node);
                      }
                    }}
                  />
                </div>
              );
            })}
            <div className="h-[35vh] w-[35vh]"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
