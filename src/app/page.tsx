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
  const videoRef = useRef<HTMLVideoElement>(null);
  const date = new Date();
  const location = "Oslo, Norge";
  const records = [
    { title: "Tre arresetert", videoSrc: "/video/result_voice.mp4" },
    { title: "Forstyrelser på smøgen", videoSrc: "/video/result_voice.mp4" },
    { title: "Synkehull på e6", videoSrc: "/video/result_voice.mp4" },
  ];
  //

  const scrollRef = useRef<Map<number, HTMLButtonElement>>(new Map());
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [spinningId, setSpinningId] = useState<number>();
  useEffect(() => {
    const listener = () => {
      const node = scrollRef.current.get(activeId);
      if (node) {
        node.scrollIntoView({
          block: "nearest",
          inline: "center",
        });
      }
    };
    listener();
    document.addEventListener("resize", listener);
    return () => {
      document.removeEventListener("resize", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleClick = (id: number) => () => {
    const node = scrollRef.current.get(id);
    if (node) {
      setActiveId(id);
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setSpinningId(undefined);
      setIsPlaying(true);
      setTimeout(() => {
        setSpinningId(id);
      }, 400);
    }
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
            src={records[activeId].videoSrc}
            type="video/mp4"
            ref={videoRef}
          />
        </div>
        <div className="pt-2 pb-8">
          <Marquee>
            {records.map((headline, i) => {
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
                    isPlaying={id === spinningId}
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

        <div className="fixed bottom-0 w-[50vh] rounded-b-3xl bg-black p-4 text-white grid grid-cols-[1fr,_min-content]">
          <div className="flex flex-col uppercase gap-y-2">
            <div className="font-semibold text-xs">
              {date.toLocaleDateString("no-NB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}
            </div>
            <div className="font-medium text-xl">
              {records[activeId] && records[activeId].title}
            </div>
          </div>
          <button
            className="flex-shrink"
            onClick={() => {
              setIsPlaying((prev) => {
                if (prev) {
                  setSpinningId(undefined);
                } else {
                  setSpinningId(activeId);
                }
                return !prev;
              });
            }}
          >
            <div>{isPlaying ? "stop" : "play"}</div>
          </button>
        </div>
      </div>
    </main>
  );
}
