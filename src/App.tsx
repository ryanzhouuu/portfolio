import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";

function App() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
