import { ForwardedRef, RefObject, forwardRef } from "react";

function VideoInner(
  { src, type }: { src: string; type: string },
  ref: ForwardedRef<HTMLVideoElement>
) {
  return (
    <video autoPlay loop ref={ref}>
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}

export const Video = forwardRef(VideoInner);
