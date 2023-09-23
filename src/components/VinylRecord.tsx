"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface VinlyRecordProps {
  title: string;
  isPlaying: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function VinylRecord({
  title,
  handleClick,
  isPlaying,
}: VinlyRecordProps) {
  const radii = [40, 35, 30, 25, 20];
  return (
    <button onClick={handleClick} className="relative w-full h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 101 101"
        width="100%"
        height="100%"
        className={`will-change-transform${
          isPlaying ? " animate-spin-slow" : ""
        }`}
      >
        <circle cx="51" cy="51" r="50" fill="black" />
        <circle cx="51" cy="51" r="15" fill="green" />
        <path
          d="M38,51a13,13 0 1,0 26,0a13,13 0 1,0 -26,0"
          id="label"
          fill="transparent"
        />
        <circle cx="51" cy="51" r="2" fill="white" />
        {radii.map((r) => (
          <circle
            cx="51"
            cy="51"
            r={r}
            stroke="#222"
            key={r}
            fill="none"
            strokeWidth={0.2}
          />
        ))}
        <text
          width="30"
          fill="#fff"
          fontSize={5}
          fontWeight={300}
          letterSpacing={0.5}
          className="uppercase"
        >
          <textPath xlinkHref="#label">{title}</textPath>
        </text>
      </svg>
      <div className="absolute rounded-full inset-0 bg-gradient-to-r mix-blend-screen opacity-20 from-black via-white to-black" />
    </button>
  );
}
