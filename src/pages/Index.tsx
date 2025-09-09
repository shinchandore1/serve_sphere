import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NgoGrid from "@/components/NgoGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <NgoGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
