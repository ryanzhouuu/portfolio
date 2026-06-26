import Atmosphere from '@/components/site/Atmosphere';
import CursorLight from '@/components/site/CursorLight';
import DustMotes from '@/components/site/DustMotes';
import Nav from '@/components/site/Nav';
import Hero from '@/components/site/Hero';
import ProjectGallery from '@/components/site/ProjectGallery';
import Experience from '@/components/site/Experience';
import About from '@/components/site/About';
import Education from '@/components/site/Education';
import Contact from '@/components/site/Contact';

export default function Home() {
  return (
    <>
      <Atmosphere />
      <CursorLight />
      <DustMotes />
      <Nav />
      <main className="relative">
        <Hero />
        <ProjectGallery />
        <Experience />
        <About />
        <Education />
        <Contact />
      </main>
    </>
  );
}
