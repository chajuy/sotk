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

  useEffect(() => {
    fetch("/api/slideshow")
      .then((res) => res.json())
      .then((data) => setImages(shuffleArray(data))); // 가져올 때 랜덤으로 섞기
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 300);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
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
              className="object-cover grayscale"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
