import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollScene from "@/components/ScrollScene";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <ScrollScene />
      <Footer />
    </main>
  );
}
