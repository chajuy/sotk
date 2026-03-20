import Sidebar from "@/components/Sidebar";
import Slideshow from "@/components/Slideshow";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-full">
      <Sidebar />
      <section className="flex-1 flex items-start justify-center pt-4 md:py-6 overflow-hidden">
        <Slideshow />
      </section>
    </main>
  );
}
