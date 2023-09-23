"use client";

import classNames from "classnames";
import Image from "next/image";
import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useState,
} from "react";

interface VinlyRecordProps {
  title: string;
  isPlaying: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const VinylRecord = forwardRef(function VinylRecordInner(
  { title, handleClick, isPlaying }: VinlyRecordProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button onClick={handleClick} className="relative w-full h-full" ref={ref}>
      <Image
        src="/img/vinyl_static.png"
        width={400}
        height={400}
        alt=""
        className="absolute inset-0"
      />
      <Image
        src="/img/vinyl_spinning.png"
        width={400}
        height={400}
        alt=""
        className={classNames(
          "absolute inset-0",
          isPlaying && "animate-spin-slow"
        )}
      />
    </button>
  );
});
