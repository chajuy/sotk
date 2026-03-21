"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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

  // 터치 시작 위치를 저장해요
  // useRef는 값이 바뀌어도 리렌더링을 일으키지 않아서
  // 터치 좌표처럼 렌더링에 영향을 주지 않는 값을 저장할 때 사용해요
  const touchStartX = useRef<number | null>(null);

  // ESC, 좌우 화살표 키 이벤트
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // 터치 시작 시 X 좌표를 저장해요
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // 터치 끝날 때 시작 좌표와 비교해서 스와이프 방향을 판단해요
  // 50px 이상 움직여야 스와이프로 인식해요 (오작동 방지)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) {
      // 왼쪽으로 스와이프 → 다음 사진
      onNext();
    } else if (diff < -50) {
      // 오른쪽으로 스와이프 → 이전 사진
      onPrev();
    }

    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative max-w-5xl w-full mx-4 md:mx-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.url}
          alt={`photo-${currentIndex}`}
          width={image.width}
          height={image.height}
          className="w-full h-auto grayscale object-contain max-h-[85vh]"
        />

        {/* 화살표 버튼 - 데스크탑에서만 표시 */}
        <button
          onClick={onPrev}
          className="hidden md:block absolute left-[-48px] top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-2xl transition-colors"
        >
          ←
        </button>
        <button
          onClick={onNext}
          className="hidden md:block absolute right-[-48px] top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-2xl transition-colors"
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

        {/* 현재 위치 표시 */}
        <p className="text-center text-white/30 text-xs mt-4 tracking-widest">
          {currentIndex + 1} / {images.length}
        </p>

        {/* 모바일에서만 스와이프 힌트 표시 */}
        <p className="md:hidden text-center text-white/20 text-[9px] mt-2 tracking-widest">
          swipe to navigate
        </p>
      </div>
    </div>
  );
}
