import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

interface MediumPost {
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
  categories: string[];
}

function extractThumbnail(content: string): string {
  // Try og:image / media:content / first <img> inside the CDATA
  const mediaMatch = content.match(/<media:content[^>]+url="([^"]+)"/);
  if (mediaMatch) return mediaMatch[1];

  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) return imgMatch[1];

  return "";
}

export async function GET() {
  try {
    const res = await fetch(
      "https://medium.com/feed/@evansosei0707",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch feed" }, { status: 502 });
    }

    const xml = await res.text();

    // Parse <item> blocks
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    const posts: MediumPost[] = items.slice(0, 5).map((item) => {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
        ?? item.match(/<title>(.*?)<\/title>/)?.[1]
        ?? "Untitled";

      const link = item.match(/<link>(.*?)<\/link>/)?.[1]
        ?? item.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1]
        ?? "#";

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";

      const categoriesRaw = [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)];
      const categories = categoriesRaw.map((m) => m[1]).slice(0, 3);

      // Thumbnail: try media:thumbnail first, then extract from content
      const thumbMatch = item.match(/<media:thumbnail[^>]+url="([^"]+)"/);
      const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
      const thumbnail =
        thumbMatch?.[1] ??
        (contentMatch ? extractThumbnail(contentMatch[1]) : "") ??
        "";

      return { title, link, thumbnail, pubDate, categories };
    });

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("[medium-posts]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
