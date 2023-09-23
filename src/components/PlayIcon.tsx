export function PlayAndStopIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div
      className="h-6 w-6 bg-current clip"
      style={{
        clipPath: isPlaying
          ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
          : "polygon(0 0, 100% 50%, 100% 50%, 0% 100%)",
        transition: "clip-path 400ms",
      }}
    />
  );
}
