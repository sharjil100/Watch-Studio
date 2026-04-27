import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const ScrollScene = dynamic(() => import("@/components/ScrollScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <ScrollScene />
      <Footer />
    </main>
  );
}
