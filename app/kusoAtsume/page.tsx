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

// 로딩 중 표시할 웃긴 문구들
const loadingMessages = [
  "Dance until the photos arrive...",
  "Bribing pixels to load faster...",
  "Teaching photos to swim upstream...",
  "Asking clouds to hurry up...",
  "Negotiating with the internet...",
];

export default function KusoAtsumePage() {
  const [mounted, setMounted] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // 로딩 상태를 관리해요
  // isLoading이 true일 때는 MORE 버튼을 비활성화해서 연속 클릭을 방지해요
  const [isLoading, setIsLoading] = useState(false);
  // 랜덤으로 로딩 문구를 선택해요
  const [loadingMessage] = useState(
    () => loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
  );

  useEffect(() => {
    setMounted(true);
    fetchPhotos(null);
  }, []);

  const fetchPhotos = async (cursor: string | null) => {
    // 이미 로딩 중이면 함수를 실행하지 않아요
    // 연속 클릭 방지의 핵심이에요
    if (isLoading) return;

    setIsLoading(true); // 로딩 시작

    const url = cursor ? `/api/kusoAtsume?cursor=${cursor}` : `/api/kusoAtsume`;

    const res = await fetch(url);
    const data = await res.json();

    setPhotos((prev) => (cursor ? [...prev, ...data.images] : data.images));
    setNextCursor(data.nextCursor);
    setHasMore(!!data.nextCursor);

    setIsLoading(false); // 로딩 완료
  };

  if (!mounted) return null;

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

      {/* 최초 로딩 중일 때 (사진이 아직 없을 때) 문구 표시 */}
      {isLoading && photos.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p
            className="text-white/40 text-[9px] md:text-[10px] tracking-widest text-center px-4"
            style={{ fontFamily: "var(--font-press-start)" }}
          >
            {loadingMessage}
          </p>
        </div>
      ) : (
        <>
          {/* 사진 그리드 */}
          <div className="p-4 md:p-6 grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4">
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
                  sizes="(max-width: 768px) 25vw, 20vw"
                  className="object-cover grayscale"
                />
              </div>
            ))}
          </div>

          {/* MORE 버튼 - isLoading 중에는 비활성화 */}
          {hasMore && (
            <div className="flex justify-center pb-8">
              <button
                onClick={() => fetchPhotos(nextCursor)}
                disabled={isLoading}
                className={`text-xs tracking-widest transition-colors border border-white/20 px-6 py-2
                  ${
                    isLoading
                      ? "text-white/20 cursor-not-allowed"
                      : "text-white/50 hover:bg-white hover:text-black cursor-pointer"
                  }`}
              >
                {/* 로딩 중이면 LOADING..., 아니면 MORE */}
                {isLoading ? "LOADING..." : "MORE"}
              </button>
            </div>
          )}
        </>
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
