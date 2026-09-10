import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPhilosophy } from './components/AboutPhilosophy';
import { Academics } from './components/Academics';
import { Projects } from './components/Projects';
import { HobbiesSection } from './components/HobbiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-background text-ink selection:bg-accent-cyan/30 selection:text-accent-cyan">
      <Navbar />
      <main>
        <Hero />
        <AboutPhilosophy />
        <Academics />
        <Projects />
        <HobbiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
