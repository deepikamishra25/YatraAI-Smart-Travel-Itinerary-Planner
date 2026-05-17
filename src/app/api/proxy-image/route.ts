import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing URL", { status: 400 });

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Proxy image error:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
