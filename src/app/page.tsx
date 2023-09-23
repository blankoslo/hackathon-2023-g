"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Header } from "@/components/Header";
import { PlayAndStopIcon } from "@/components/PlayIcon";
import { VinylRecord } from "@/components/VinylRecord";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useSwipeable } from "react-swipeable";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const date = new Date();
  const location = "Oslo, Norge";
  const records = [
    {
      title: "Jakob Ingebrigtsen's Wedding Day",
      videoSrc: "/video/sy_jakob.mp4",
      url: "https://www.nrk.no/osloogviken/sier-ja-til-sin-elisabeth-1.16567747",
      color: "green",
      poster: "/img/sy_news.jpg",
    },
    {
      title: "Former Wagner Solider's Border Saga",
      videoSrc: "/video/ja_wagner_v2.mp4",
      url: "https://www.nrk.no/tromsogfinnmark/the-barents-observer_-tidligere-wagner-soldat-pagrepet-pa-grensen-til-russland-1.16568760",
      color: "purple",
    },
    {
      title: "Kvikkleireskred near Gøteborg",
      videoSrc: "/video/lee_e6.mp4",
      url: "https://www.nrk.no/norge/leirskred-naer-goteborg-_-tre-personer-til-sykehus-1.16568693",
      color: "brown",
    },
    {
      title: "Local Man Celebrates Birthday",
      videoSrc: "/video/jon.mp4",
      url: "https://en.wikipedia.org/wiki/Birthday",
      color: "pink",
    },
  ];
  //

  const scrollRef = useRef<Map<number, HTMLButtonElement>>(new Map());
  const controlsContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [spinningId, setSpinningId] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [currentTime, setCurrentTime] = useState<number>();
  const [controlsSpacerHeight, setControlsSpacerHeight] = useState<number>();
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      handleClick((activeId - 1 + records.length) % records.length)();
    },
    onSwipedLeft: () => {
      handleClick((activeId + 1) % records.length)();
    },
  });

  useEffect(() => {
    const resizeListener = () => {
      const node = scrollRef.current.get(activeId);
      if (node) {
        node.scrollIntoView({
          block: "nearest",
          inline: "center",
        });
      }
      if (controlsContainerRef.current) {
        setControlsSpacerHeight(
          controlsContainerRef.current.getBoundingClientRect().height
        );
      }
    };
    resizeListener();
    document.addEventListener("resize", resizeListener);
    if (videoRef.current) {
      videoRef.current.src = records[0].videoSrc;
    }

    const currentTimeInterval = setInterval(() => {
      const currentTime = videoRef.current?.currentTime;
      setCurrentTime(currentTime ? currentTime : 0);
    }, 100);
    return () => {
      document.removeEventListener("resize", resizeListener);
      clearInterval(currentTimeInterval);
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
      if (videoRef.current) {
        videoRef.current.src = records[id].videoSrc;
        videoRef.current.play();
      }

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
        className="text-black min-h-screen w-[50vh]"
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
        <div className="px-8 flex items-center justify-center">
          <video
            loop
            playsInline
            className="object-cover w-[55vh] h-[35vh]"
            poster={records[activeId].poster}
            ref={videoRef}
            onLoadedMetadata={() => {
              setDuration(videoRef.current?.duration);
            }}
          />
        </div>
        <div className="pt-2 pb-8">
          <Marquee>
            {records.map((headline, i) => {
              return (
                <a
                  className="bg-black mx-1 text-white flex uppercase shrink-0 w-fit p-2"
                  key={i}
                  href={headline.url}
                >
                  {headline.title}
                </a>
              );
            })}
          </Marquee>
        </div>
        <div className="overflow-x-hidden pb-8">
          <div className="flex gap-x-2 w-max" {...swipeHandlers}>
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
                    isPlaying={id === spinningId}
                    handleClick={handleClick(id)}
                    ref={(node) => {
                      if (node) {
                        scrollRef.current.set(id, node);
                      }
                    }}
                    color={record.color}
                  />
                </div>
              );
            })}
            <div className="h-[35vh] w-[35vh]"></div>
          </div>
        </div>
        <div
          className="w-[35vh]"
          style={{ height: controlsSpacerHeight }}
        ></div>
      </div>
      <div
        ref={controlsContainerRef}
        className="fixed bottom-0 w-[50vh] bg-black p-4 text-white grid grid-cols-[1fr,_min-content]"
      >
        <div className="flex flex-col uppercase">
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
          <PlayAndStopIcon
            isPlaying={isPlaying}
            progress={
              (typeof duration == "number" &&
                typeof currentTime == "number" &&
                currentTime / duration) ||
              0
            }
          />
        </button>
      </div>
    </main>
  );
}
