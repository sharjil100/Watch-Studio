import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollSceneClient from "@/components/ScrollSceneClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <ScrollSceneClient />
      <Footer />
    </main>
  );
}
