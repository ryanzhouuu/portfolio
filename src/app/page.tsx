import Atmosphere from '@/components/site/Atmosphere';
import CursorLight from '@/components/site/CursorLight';
import DustMotes from '@/components/site/DustMotes';
import Nav from '@/components/site/Nav';
import Hero from '@/components/site/Hero';
import Experience from '@/components/site/Experience';
import ProjectGallery from '@/components/site/ProjectGallery';
import About from '@/components/site/About';
import Education from '@/components/site/Education';
import Footer from '@/components/site/Footer';

export default function Home() {
  return (
    <>
      <Atmosphere />
      <CursorLight />
      <DustMotes />
      <Nav />
      <main className="relative">
        <Hero />
        <Experience />
        <ProjectGallery />
        <Education />
        <About />
        <Footer />
      </main>
    </>
  );
}
