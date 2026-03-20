import Image from "next/image";

export default function Sidebar() {
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

      {/* 2. 매일 바뀌는 문장 */}
      <div className="text-white/70 text-xs leading-6 tracking-wide text-center md:text-left">
        문장 준비중
      </div>

      {/* 3. 작품 링크들 */}
      <nav className="flex flex-row flex-wrap gap-2 mx-auto">
        <a
          href="#"
          className="bg-white text-black text-[9px] px-2 py-[3px] tracking-widest hover:bg-white/70 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          test
        </a>
        <a
          href="#"
          className="bg-white text-black text-[9px] px-2 py-[3px] tracking-widest hover:bg-white/70 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          work2
        </a>
      </nav>
    </aside>
  );
}
