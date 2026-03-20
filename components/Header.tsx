import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 md:py-10 lg:py-12 flex justify-center items-center border-b border-white/20 px-4">
      <Link href="/">
        <h1
          className="text-white text-xs md:text-sm lg:text-base tracking-widest cursor-pointer hover:opacity-70 transition-opacity text-center leading-relaxed"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          SEX ON THE KURUMA
        </h1>
      </Link>
    </header>
  );
}
