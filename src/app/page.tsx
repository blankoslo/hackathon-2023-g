import Image from "next/image";

export default async function Home() {
  // const songText = await cachedConvertTextToSong(
  //   JSON.stringify(await getNewsFeed())
  // );
  return (
    <main className="flex items-center justify-center">
      <div className="bg-slate-200 h-screen w-[50vh] rounded-3xl">
        <div>
          <Image src="/logo.svg" alt="Breaking tunes" width={212} height={43} />
        </div>
        <div></div>
      </div>
    </main>
  );
}
