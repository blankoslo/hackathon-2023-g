export function PlayAndStopIcon({
  isPlaying,
  progress,
}: {
  isPlaying: boolean;
  progress: number;
}) {
  return (
    <div className="relative h-12 w-12">
      <div
        className="h-12 w-12 rounded-full absolute inset-0 m-auto"
        style={{
          background: `radial-gradient(closest-side, transparent 79%, transparent 80% 100%), conic-gradient(currentColor ${
            progress * 100
          }%, black 0)`,
        }}
      ></div>
      <div className="bg-black rounded-full h-10 w-10 absolute inset-0 m-auto" />
      <div
        className="h-5 w-5 bg-current clip absolute inset-0 max-w-full max-h-full mx-auto my-auto"
        style={{
          clipPath: isPlaying
            ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            : "polygon(0 0, 100% 50%, 100% 50%, 0% 100%)",
          transition: "clip-path 400ms",
        }}
      />
    </div>
  );
}
