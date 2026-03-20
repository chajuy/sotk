"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SlideshowImage = {
  src: string;
  alt: string;
};

// 배열을 랜덤으로 섞는 함수
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Slideshow() {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    fetch("/api/slideshow")
      .then((res) => res.json())
      .then((data) => setImages(shuffleArray(data)));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 300);

    return () => clearInterval(interval);
  }, [images]);

  // 화면 비율 감지
  useEffect(() => {
    const checkRatio = () => {
      // 슬라이드쇼 영역의 비율이 사진 비율(3:2)보다 가로가 넓으면 cover, 세로가 길면 contain
      const container = document.getElementById("slideshow-container");
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      setIsWide(width / height > 3 / 2);
    };

    checkRatio();
    window.addEventListener("resize", checkRatio);
    return () => window.removeEventListener("resize", checkRatio);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="w-full h-full">
      <div id="slideshow-container" className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`grayscale ${isWide ? "object-cover" : "object-contain"}`}
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
