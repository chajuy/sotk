"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

type Photo = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export default function KusoAtsumePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  // next_cursor를 string | null로 관리해요
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 최초 로딩
  useEffect(() => {
    fetchPhotos(null);
  }, []);

  // cursor를 받아서 이미지를 가져오는 함수
  // cursor가 null이면 첫 페이지, 있으면 다음 페이지예요
  const fetchPhotos = async (cursor: string | null) => {
    const url = cursor ? `/api/kusoAtsume?cursor=${cursor}` : `/api/kusoAtsume`;

    const res = await fetch(url);
    const data = await res.json();

    setPhotos((prev) => (cursor ? [...prev, ...data.images] : data.images));
    setNextCursor(data.nextCursor);
    setHasMore(!!data.nextCursor);
  };

  return (
    <div className="flex-1 overflow-y-auto h-full">
      {/* 페이지 타이틀 */}
      <div className="flex justify-center py-4 md:py-6 border-b border-white/20">
        <h2
          className="bg-white text-black text-[10px] md:text-xs px-4 py-2 tracking-widest"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          KUSO ATSUME
        </h2>
      </div>

      {/* 사진 그리드 */}
      <div className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="aspect-square overflow-hidden relative cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={photo.url}
              alt={`photo-${index}`}
              fill
              className="object-cover grayscale"
            />
          </div>
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && (
        <div className="flex justify-center pb-8">
          <button
            onClick={() => fetchPhotos(nextCursor)}
            className="text-white/50 text-xs tracking-widest hover:text-white transition-colors border border-white/20 px-6 py-2"
          >
            MORE
          </button>
        </div>
      )}

      {/* 라이트박스 */}
      {lightboxIndex !== null && (
        <Lightbox
          images={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + photos.length) % photos.length : null,
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % photos.length : null,
            )
          }
        />
      )}
    </div>
  );
}
