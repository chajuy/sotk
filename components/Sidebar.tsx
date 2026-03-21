"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { quotes } from "@/data/quotes";

function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24,
  );
  return quotes[dayOfYear % quotes.length];
}

export default function Sidebar() {
  // mounted 상태를 추가해서 클라이언트에서만 렌더링되도록 해요
  // 서버에서는 null을 반환하고 클라이언트에서만 실제 내용을 렌더링해요
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const quote = useMemo(() => getDailyQuote(), []);

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/20 p-4 md:p-6 flex flex-col gap-4 md:gap-8">
      {/* 1. 프로필 사진 - 직사각형 */}
      <div className="w-1/5 md:w-2/3 mx-auto aspect-[3/4] overflow-hidden relative">
        <Image
          src="/assets/images/profile.jpg"
          alt="profile"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* 2. 매일 바뀌는 문장 - mounted 후에만 표시 */}
      {mounted && (
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-white/70 text-xs leading-6 tracking-wide whitespace-pre-line leading-tight">
            {quote.text}
          </p>
          {quote.author && (
            <span className="text-white/30 text-[10px] tracking-widest">
              — {quote.author}
            </span>
          )}
        </div>
      )}

      {/* 3. 작품 링크들 */}
      <nav className="flex flex-row flex-wrap gap-2 justify-center md:justify-start">
        <a
          href="/kusoAtsume"
          className="bg-white text-black text-[9px] px-2 py-[3px] tracking-widest hover:bg-white/70 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          KUSO A TSUME
        </a>
      </nav>
    </aside>
  );
}
