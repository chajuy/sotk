import Sidebar from "@/components/Sidebar";
import Slideshow from "@/components/Slideshow";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-full overflow-hidden">
      <Sidebar />
      <section className="flex-1 flex items-start justify-center overflow-hidden pb-6">
        <Slideshow />
      </section>
    </main>
  );
}
