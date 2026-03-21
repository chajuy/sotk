import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  // 환경변수 확인용 임시 코드
  console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API_KEY:", process.env.CLOUDINARY_API_KEY);

  const { searchParams } = new URL(request.url);
  // next_cursor는 Cloudinary가 반환하는 페이지네이션 커서값이에요
  // 첫 페이지는 cursor가 없고, 다음 페이지부터 cursor값을 전달해요
  const cursor = searchParams.get("cursor");
  const perPage = 15;

  try {
    // cursor가 있으면 다음 페이지, 없으면 첫 페이지
    let search = cloudinary.search
      .expression("folder:KUSOATSUME")
      .sort_by("created_at", "desc")
      .max_results(perPage);

    if (cursor) {
      search = search.next_cursor(cursor);
    }

    const result = await search.execute();

    return NextResponse.json({
      images: result.resources.map((img: any) => ({
        id: img.asset_id,
        url: img.secure_url,
        width: img.width,
        height: img.height,
      })),
      totalCount: result.total_count,
      nextCursor: result.next_cursor || null,
    });
  } catch (error) {
    console.error("Cloudinary error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}
