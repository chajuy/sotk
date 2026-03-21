"use client";

import Image from "next/image";
import { useEffect } from "react";

type LightboxProps = {
  images: { id: string; url: string; width: number; height: number }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const image = images[currentIndex];

  // ESC키로 닫기
  // useEffect로 키보드 이벤트를 등록하고
  // 컴포넌트가 사라질 때 이벤트를 제거해요 (메모리 누수 방지)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    // 배경 클릭으로 닫기
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* 이미지 영역 - 클릭해도 닫히지 않도록 전파 막기 */}
      <div
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.url}
          alt={`photo-${currentIndex}`}
          width={image.width}
          height={image.height}
          className="w-full h-auto grayscale object-contain max-h-[85vh]"
        />

        {/* 이전 버튼 */}
        <button
          onClick={onPrev}
          className="absolute left-[-48px] top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-2xl transition-colors"
        >
          ←
        </button>

        {/* 다음 버튼 */}
        <button
          onClick={onNext}
          className="absolute right-[-48px] top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-2xl transition-colors"
        >
          →
        </button>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-[-36px] right-0 text-white/70 hover:text-white text-sm tracking-widest transition-colors"
        >
          CLOSE
        </button>

        {/* 현재 위치 표시 예) 3 / 12 */}
        <p className="text-center text-white/30 text-xs mt-4 tracking-widest">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
