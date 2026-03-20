import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const dir = path.join(process.cwd(), "public/assets/images/slideshow");
  const files = await readdir(dir);

  const images = files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => {
      const numA = parseInt(a.replace("top_", "").replace(".jpg", ""));
      const numB = parseInt(b.replace("top_", "").replace(".jpg", ""));
      return numA - numB;
    })
    .map((file) => ({
      src: `/assets/images/slideshow/${file}`, // 파일명 그대로 사용
      alt: file,
    }));

  return NextResponse.json(images);
}
