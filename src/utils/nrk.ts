import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

export async function getNewsFeed(): Promise<
  { title: string; description: string }[]
> {
  const parser = new XMLParser();
  const newsFeed: any = await fetch("https://www.nrk.no/toppsaker.rss", {
    next: {
      revalidate: 100,
    },
  }).then(async (res) => parser.parse(await res.text()));
  return newsFeed.rss.channel.item
    .map(({ title, description }: { title: string; description: string }) => ({
      title,
      description,
    }))
    .slice(0, 3);
}
