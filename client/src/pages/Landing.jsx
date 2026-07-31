import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import WorkspaceSection from "../components/landing/WorkspcaeSection";
import Footer from "../components/landing/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <WorkspaceSection />
      <Footer />
    </div>
  );
}

export default Landing;