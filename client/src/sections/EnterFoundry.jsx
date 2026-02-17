import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Terminal, Hammer, Network, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const phases = [
  {
    id: "01",
    role: "The Apprentice",
    duration: "Months 1-2",
    tag: "Calibration",
    desc: "Raw potential meets engineering discipline. You break things in the Sandbox to understand how they work.",
    icon: Terminal,
    specs: [
      "Master the Enclope Stack",
      "Internal Tool Development",
      "Bug Fixes & Refactoring",
      "Strict Code Review Protocol"
    ]
  },
  {
    id: "02",
    role: "The Artisan",
    duration: "Months 3-5",
    tag: "Forging",
    desc: "You stop simulating and start shipping. You join a live squad to build and deploy real client features.",
    icon: Hammer,
    specs: [
      "Feature Ownership (End-to-End)",
      "Database Schema Design",
      "Production Deployments",
      "Client-Facing Documentation"
    ]
  },
  {
    id: "03",
    role: "The Architect",
    duration: "Months 6+",
    tag: "Command",
    desc: "You evolve from builder to leader. You design the systems that others build and mentor the next cohort.",
    icon: Network,
    specs: [
      "System Architecture Design",
      "Sprint Planning & Leadership",
      "Code Review Authority",
      "Junior Mentorship"
    ]
  }
];

// --- COMPONENT: INTERACTIVE CARD ---
const SchematicNode = ({ phase, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0.2, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.5 }}
      // CHANGED: Reduced vertical padding from py-12 to py-6 for compact look
      className="relative pl-8 md:pl-24 py-4 md:py-6 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. HORIZONTAL CONNECTOR */}
      {/* CHANGED: Adjusted top position (top-14) to align with smaller box */}
      <div className={`absolute left-[12px] md:left-[50px] top-14 w-4 md:w-16 h-px transition-colors duration-500 ${isHovered ? 'bg-accent' : 'bg-white/10'}`} />

      {/* 2. THE CARD CONTENT */}
      <div className={`relative border bg-[#0A0A0A] rounded-xl overflow-hidden transition-all duration-500 ${isHovered ? 'border-accent/50 shadow-[0_0_30px_rgba(255,95,31,0.1)]' : 'border-white/5'}`}>

        {/* Hover Background Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />

        {/* CHANGED: Reduced padding from p-8 to p-6 */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded border transition-colors duration-500 ${isHovered ? 'bg-accent text-white border-accent' : 'bg-white/5 text-accent border-white/5'}`}>
                <phase.icon size={18} />
              </div>
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                Phase_{phase.id}
              </span>
            </div>
            <div className={`px-2 py-1 rounded border transition-colors duration-500 ${isHovered ? 'border-accent/30 bg-accent/10 text-accent' : 'border-white/10 bg-white/5 text-white/30'}`}>
              <span className="text-[10px] font-mono uppercase tracking-widest">{phase.duration}</span>
            </div>
          </div>

          {/* Title & Description */}
          {/* CHANGED: Reduced title size to text-2xl */}
          <h3 className="text-2xl font-bold text-white mb-2">{phase.role}</h3>
          <p className="text-text-secondary leading-relaxed font-light text-sm max-w-xl">
            {phase.desc}
          </p>

          {/* 3. THE REVEAL (Tech Specs) */}
          <motion.div
            initial={false}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            className="overflow-hidden"
          >
            {/* CHANGED: Reduced margins (pt-4 mt-4) */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest mb-3 block">
                 // Operational Protocols
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {phase.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <div className="w-1 h-1 bg-accent rounded-full" />
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Corner Decor */}
        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-500 ${isHovered ? 'border-accent' : 'border-white/20'}`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-500 ${isHovered ? 'border-accent' : 'border-white/20'}`} />

      </div>

    </motion.div>
  );
};

export default function EnterFoundry() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-16 md:py-32 bg-black border-b border-white/5 overflow-hidden">

      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none hidden md:block"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">

        {/* HEADER */}
        {/* CHANGED: Updated Text to be clear and visionary */}
        <div className="pl-8 md:pl-24 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4 block">
              Career Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none mb-4 md:mb-6">
              Your Path to <span className="text-white/40">Mastery.</span>
            </h2>
            <p className="text-text-secondary max-w-lg text-base md:text-lg font-light">
              We don't just assign tasks; we build engineers. See exactly how you will evolve from a student into a system architect.
            </p>
          </motion.div>
        </div>

        {/* THE SCHEMATIC CIRCUIT */}
        <div className="relative">

          {/* Main Track */}
          <div className="absolute left-[12px] md:left-[50px] top-0 bottom-0 w-[2px] bg-white/5" />

          {/* Active Laser (Scroll Driven) */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[12px] md:left-[50px] top-0 bottom-0 w-[2px] bg-accent shadow-[0_0_20px_#FF5F1F] z-10"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center w-8 h-8 bg-black border border-accent rounded shadow-[0_0_15px_#FF5F1F]">
              <ChevronDown className="w-4 h-4 text-accent" />
            </div>
          </motion.div>

          {/* Cards */}
          <div>
            {phases.map((phase, index) => (
              <SchematicNode key={phase.id} phase={phase} index={index} />
            ))}
          </div>

        </div>

        {/* FOOTER */}
        <div className="pl-8 md:pl-24 mt-8 md:mt-12">
          <Link
            to="/apply"
            className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-bold font-mono text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,95,31,0.4)]"
          >
            Initialize Sequence
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-xs font-mono text-white/30">
             // COHORT STATUS: OPEN FOR APPLICATIONS
          </p>
        </div>

      </div>
    </section>
  );
}