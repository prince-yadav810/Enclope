import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// --- COMPONENTS ---
import SectionPreview from '../components/SectionPreview';
import Hero from '../sections/Hero';
import FoundryPulse from '../sections/FoundryPulse';
import ValueProposition from '../sections/ValueProposition';
import EnterFoundry from '../sections/EnterFoundry';
import StarterKit from '../sections/StarterKit';
import Crucible from '../sections/Crucible';

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis();
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // Lenis sets overflow:hidden on html/body and uses CSS transforms for scrolling.
      // Its destroy() doesn't always restore these during React's async cleanup,
      // causing the next page to render "blank" (content hidden by overflow:hidden).
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <Hero />

      {/* Wrapper for content */}
      <div className="content-grid-bg">



        <FoundryPulse />
        <ValueProposition />

        {/* THE FORGE (Services) - Image Left */}
        <SectionPreview
          subtitle="Our Capabilities"
          title="The Forge"
          description="We don't just write code. We architect solutions. From high-scale SaaS platforms to immersive web experiences, we bring professional-grade engineering to every commit."
          image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" // Replace with your own asset
          label="Service Catalog"
          linkText="Explore Services"
          linkUrl="/forge"
          reversed={true} // Image on Right
        />

        {/* THE SHOWROOM (Work) - Image Right */}
        <SectionPreview
          subtitle="Selected Works"
          title="The Showroom"
          description="Evidence of execution. Browse our gallery of shipped products, open-source contributions, and experimental prototypes."
          image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" // Replace with your own asset
          label="Project Gallery"
          linkText="View Case Studies"
          linkUrl="/showroom"
          reversed={false} // Image on Left
        />

        <EnterFoundry />
        <StarterKit />

      </div>
    </>
  );
}