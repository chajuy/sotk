import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* 왼쪽 사이드바 영역 */}
      <Sidebar />

      {/* 오른쪽 메인 영역 */}
      <section className="flex-1 p-6">메인 준비중</section>
    </main>
  );
}
